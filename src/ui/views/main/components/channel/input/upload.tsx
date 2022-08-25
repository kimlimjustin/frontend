import type { IStreamUpload } from "client-sdk/src/client";

import { Icons } from "lantern-icons";
import { categorize_mime } from "lib/mime";
import { createEffect, createMemo, createSignal, For, JSX, Match, onCleanup, onMount, Show, Switch, useContext } from "solid-js"
import { createStore, produce, unwrap } from "solid-js/store";
import { usePrefs } from "state/contexts/prefs";
import { CLIENT } from "state/global";
import { Snowflake } from "state/models";
import { VectorIcon } from "ui/components/common/icon";
import { UIText } from "ui/components/common/ui-text";
import { MimeIcon } from "ui/components/mime";
import { FullscreenModal } from "ui/components/modal";
import { SetController } from "ui/hooks/createController";
import { createRef, Ref } from "ui/hooks/createRef";

import "./upload.scss";

let eat = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
};

export interface IFileUploadController {
    reset(): void;
    upload(): Promise<Array<Snowflake | undefined>>;
}

export interface IUploadPanelProps {
    /// Will be set to the most recent input element.
    input: Ref<HTMLInputElement | undefined>,

    onChange(size: number): void;

    fc: SetController<IFileUploadController>;
}

interface IFileMeta {
    id: number,
    width?: number,
    height?: number,
    progress: number,
    spoiler: boolean,
}

interface IMappedFile {
    file: File,
    ref: Ref<HTMLImageElement | HTMLVideoElement | undefined>,
}

var COUNTER = 0;

const SPOILER = "SPOILER_", DEFAULT_MIME = "application/octet-stream";

export function UploadPanel(props: IUploadPanelProps) {
    let files: Map<number, IMappedFile> = new Map();
    let [file_meta, setFileMeta] = createStore<Array<IFileMeta>>([]);

    let update_file_meta = (id: number, meta: Partial<IFileMeta>) => {
        setFileMeta(file_meta.findIndex(v => v.id == id), meta);
    };

    createEffect(() => props.onChange(file_meta.length))

    let on_drop = (new_files: Array<File>) => setFileMeta(arr => {
        let new_arr: Array<IFileMeta> = [];

        new_files.sort((a, b) => a.lastModified - b.lastModified);

        for(let file of new_files) {
            let id = COUNTER++;
            files.set(id, { file, ref: createRef() });
            new_arr.push({ id, progress: 0, spoiler: file.name.startsWith(SPOILER) });
        }

        return [...arr, ...new_arr];
    });

    let on_file_input = (e: InputEvent) => {
        let input = e.currentTarget as HTMLInputElement;
        if(input.files) {
            on_drop(Array.from(input.files));
            add_input();
        }
    };

    let inputs: HTMLDivElement | undefined;
    let add_input = () => {
        let new_input = document.createElement('input');
        new_input.type = 'file';
        new_input.multiple = true;
        new_input.addEventListener('input', on_file_input);

        inputs!.appendChild(new_input);
        props.input(new_input);
    };

    let on_wheel = (e: WheelEvent) => {
        if(!e.ctrlKey) {
            let div = e.currentTarget as HTMLDivElement;
            div.scrollBy({ left: e.deltaY });
            eat(e);
        }
    };

    let [uploading, setUploading] = createSignal(false);

    let reset = () => {
        setFileMeta([]);
        files.clear();

        let child;
        while(child = inputs!.firstChild) { child.remove(); }
        add_input();
        setUploading(false);
    };

    props.fc({
        reset,
        async upload() {
            setUploading(true);

            let onProgress = (id: number, sent: number, total: number) => {
                update_file_meta(id, { progress: sent / total });
            };
            let onError = () => { };

            let streams: Array<IStreamUpload> = [];

            files.forEach(({ file }, id) => {
                let meta = file_meta.find(v => v.id == id)!;

                let name = file.name, was_spoilered = name.startsWith(SPOILER);
                if(was_spoilered && !meta.spoiler) {
                    name = name.slice(SPOILER.length);
                } else if(!was_spoilered && meta.spoiler) {
                    name = SPOILER + name;
                }

                streams.push({
                    id,
                    meta: {
                        width: meta.width,
                        height: meta.height,
                        mime: file.type || DEFAULT_MIME,
                        filename: name,
                    },
                    stream: file,
                });
            });

            let ids = await CLIENT.upload_streams(streams, onProgress);

            reset();

            return ids;
        },
    });

    let remove_file = (file_id: number) => {
        files.delete(file_id);
        setFileMeta(arr => arr.filter(v => v.id != file_id));
    };

    let update_meta = (e: Event, id: number) => {
        if(files.has(id)) {
            let el = e.currentTarget as HTMLImageElement & HTMLVideoElement;
            let width = el.naturalWidth || el.videoWidth;
            let height = el.naturalHeight || el.videoHeight;

            update_file_meta(id, { width, height });
        }
    };

    let set_spoiler = (id: number, spoiler: boolean) => {
        if(files.has(id)) {
            update_file_meta(id, { spoiler });
        }

        let s = 0, n = 0;
        for(let f of file_meta) {
            f.spoiler ? s++ : n++;
        }

        setSpoileredAll(s > n);
    };

    let [spoileredAll, setSpoileredAll] = createSignal(false);

    let spoiler_all = () => setFileMeta(produce((arr: Array<IFileMeta>) => {
        let s = !spoileredAll();
        arr.forEach(f => f.spoiler = s);
        setSpoileredAll(s);
    }));

    let stop = (e: Event) => e.stopPropagation();

    return (
        <>
            <div class="ln-upload-inputs" ref={r => {
                inputs = r;
                add_input();
            }} />
            <UploadDropper on_drop={on_drop} />

            <Show when={file_meta.length > 1}>
                <div class="ln-attachment-controls">
                    <div class="ln-attachment-controls__spoiler" title={(spoileredAll() ? "Unspoiler" : "Spoiler") + " All"}
                        onClick={spoiler_all}>
                        <VectorIcon id={spoileredAll() ? Icons.Unspoiler : Icons.Spoiler} />
                    </div>
                    <div class="ln-attachment-controls__remove" onClick={reset} title="Remove All">
                        <VectorIcon id={Icons.CircleEmptyRemove} />
                    </div>
                </div>
            </Show>

            <ul class="ln-attachment-previews ln-scroll-x" onWheel={on_wheel} onTouchMove={stop} onTouchStart={stop} onTouchEnd={stop}>
                <For each={file_meta}>
                    {file => <UploadPreview meta={file} file={files.get(file.id)!} uploading={uploading()}
                        onLoad={update_meta} onRemove={remove_file} onSpoiler={set_spoiler} />}
                </For>
            </ul>
        </>
    )
}

interface IUploadPreviewProps {
    file: IMappedFile,
    meta: IFileMeta,
    onLoad(e: Event, id: number): void;
    onSpoiler(id: number, spoiler: boolean): void;
    onRemove(id: number): void;
    uploading: boolean,
}

function UploadPreview(props: IUploadPreviewProps) {
    let prefs = usePrefs();

    let [errored, setErrored] = createSignal(false);

    let file = () => props.file.file;

    let src = createMemo(() => {
        let src = URL.createObjectURL(file());
        onCleanup(() => URL.revokeObjectURL(src));
        return src;
    });

    let icon = () => <MimeIcon category={categorize_mime(file().name, file().type)} />;

    let mime_prefix = createMemo(() => file().type.slice(0, 5));

    let common: JSX.ImgHTMLAttributes<HTMLImageElement> & JSX.VideoHTMLAttributes<HTMLVideoElement> = {
        onError: () => setErrored(true),
        onLoad: (e: Event) => props.onLoad(e, props.meta.id),
        onLoadedMetadata: (e: Event) => props.onLoad(e, props.meta.id),
    };

    let [removing, setRemoving] = createSignal(false);

    let remove = () => {
        if(prefs.ReduceAnimations()) {
            props.onRemove(props.meta.id);
        } else {
            setRemoving(true);
            setTimeout(() => props.onRemove(props.meta.id), 200);
        }
    };

    return (
        <li class="ln-attachment-preview" classList={{ 'removing': removing(), 'uploading': props.uploading }}>
            <div class="ln-attachment-preview__controls">
                <div class="ln-attachment-preview__spoiler" title={props.meta.spoiler ? "Unspoiler" : "Spoiler"}
                    onClick={() => props.onSpoiler(props.meta.id, !props.meta.spoiler)}>
                    <VectorIcon id={props.meta.spoiler ? Icons.Unspoiler : Icons.Spoiler} />
                </div>
                <div class="ln-attachment-preview__remove" onClick={remove} title="Remove">
                    <VectorIcon id={Icons.CircleEmptyMinus} />
                </div>
            </div>

            <div class="ln-attachment-preview__preview"
                classList={{ 'spoilered': props.meta.spoiler }}
                title={file().type || DEFAULT_MIME}
            >
                <Show when={!errored()} fallback={icon}>
                    <Switch fallback={icon}>
                        <Match when={mime_prefix() === 'image'}>
                            <img {...common} src={src()} />
                        </Match>

                        <Match when={mime_prefix() === 'video'}>
                            <video {...common} src={src() + "#t=0.0001"} controls={false} muted />
                        </Match>
                    </Switch>
                </Show>
            </div>

            <span class="ui-text" textContent={file().name} title={file().name} />

            <span class="ln-attachment-preview__progress"
                style={{ 'display': props.meta.progress > 0 ? 'inline-block' : 'none' }}>
                <span style={{ width: Math.round(props.meta.progress * 100) + '%' }} />
            </span>
        </li>
    )
}

interface IUploadDropperProps {
    on_drop(files: Array<File>): void;
}

function UploadDropper(props: IUploadDropperProps) {
    const [drag, setDrag] = createSignal(0);

    const inc = () => setDrag(d => d + 1);
    const dec = () => setDrag(d => Math.max(0, d - 1));

    let on_enter = (e: DragEvent) => {
        eat(e);
        if(e.dataTransfer?.types.includes("Files")) {
            e.dataTransfer.dropEffect = "copy";
            inc();
        }
    };

    let on_over = (e: DragEvent) => {
        eat(e);
        if(drag() && e.dataTransfer) {
            e.dataTransfer.dropEffect = "copy";
        }
    };

    let on_end = (e: DragEvent) => {
        eat(e);
        dec();
    };

    onMount(() => {
        let d = document.body, e = {
            'dragenter': on_enter,
            'dragover': on_over,
            'dragend': on_end,
            'dragleave': on_end,
        };

        for(let name in e) { d.addEventListener(name, e[name]); }
        onCleanup(() => {
            for(let name in e) { d.removeEventListener(name, e[name]); }
        });
    });

    let on_drop = (e: DragEvent) => {
        eat(e);

        if(drag()) {
            dec();

            if(e.dataTransfer) {
                props.on_drop(Array.from(e.dataTransfer.files));
            }
        }
    };

    return (
        <Show when={drag() > 0}>
            <FullscreenModal>
                <div class="ln-filedrop-modal" onDrop={on_drop} onDragEnter={on_enter} onDragEnd={on_end} onDragOver={on_over}>
                    <div>
                        <UIText text="Drop Files" />
                    </div>
                </div>
            </FullscreenModal>
        </Show>
    );
}