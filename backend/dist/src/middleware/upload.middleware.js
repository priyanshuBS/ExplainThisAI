import multer from "multer";
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    }
    else {
        cb(new Error("Only pdf files are allowed"));
    }
};
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 10
    }
});
