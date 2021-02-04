onmessage = (e) => {
    const type = e.data[0];
    const files = e.data[1];

    let data;

    switch (type) {
        case 'get_file_info':
            // Mount FS for files.
            if (!FS.analyzePath('/work').exists) {
                FS.mkdir('/work');
            }
            FS.mount(WORKERFS, { files }, '/work');

           
            // Call the wasm module.
            const infos = files.map(file => {
                try {
                    return Module.get_file_info('/work/' + file.name);
                } catch (error) {
                    console.log(`Error probing file: ${error}`);
                }
            });

            // Remap streams into collection.
            const data = infos.filter(info => info !== undefined).map(info => {
                var s = [];
                for (let i = 0; i < info.streams.size(); i++) {
                    s.push(info.streams.get(i));
                }
                const versions = {
                    libavutil:  Module.avutil_version(),
                    libavcodec:  Module.avcodec_version(),
                    libavformat:  Module.avformat_version(),
                };
    
                // Send back data response.
                return {
                    ...info,
                    url: info.url.slice(6),
                    streams: s,
                    versions,
                }
            });

            postMessage(data);

            // Cleanup mount.
            FS.unmount('/work');
            break;
        
        case 'get_frames':
            if (!FS.analyzePath('/work').exists) {
                FS.mkdir('/work');
            }
            FS.mount(WORKERFS, { files: [file] }, '/work');

            const offset = e.data[2];
            const frames = Module.get_frames('/work/' + file.name, offset);

            // Remap frames into collection.
            const f = [];
            for (let i = 0; i < frames.frames.size(); i++) {
                f.push(frames.frames.get(i));
            }

            data = {
                ...frames,
                frames: f,
            }
            postMessage(data);

            // Cleanup mount.
            FS.unmount('/work');
            break;
    
        default:
            break;
    }

}

self.importScripts('ffprobe-wasm.js'); // Load ffprobe into worker context.