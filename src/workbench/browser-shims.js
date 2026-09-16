// Browser shim for Node built-in modules (fs, path) in client-side bundle
module.exports = {
  readFileSync: () => { throw new Error("fs.readFileSync is not available in browser. Use FileReader / Blob."); },
  writeFileSync: () => { throw new Error("fs.writeFileSync is not available in browser. Use Blob / File download."); },
  existsSync: () => false,
  unlinkSync: () => {},
  join: (...args) => args.filter(Boolean).join("/"),
  resolve: (...args) => args.filter(Boolean).join("/"),
  dirname: (p) => (p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "."),
  basename: (p, ext) => {
    const base = p.split("/").pop() || "";
    return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base;
  },
  extname: (p) => {
    const idx = p.lastIndexOf(".");
    return idx >= 0 ? p.slice(idx) : "";
  },
};
