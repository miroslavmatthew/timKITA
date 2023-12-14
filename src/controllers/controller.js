import multer from "multer";

export const home = (req,res) => {
    res.render("index");
}

export const barchart = (req,res) => {
    res.render("barchart");
}

export const scatter = (req,res) => {
    res.render("scatter");
}
export const addData = (req,res) => {
    res.render("tambah_data");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/'); 
    },
    filename: function (req, file, cb) {
      cb(null, "data.csv");
    },
});

const upload = multer({ storage: storage });

export const uploadData = (req, res, next) => {
    upload.single('data')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.render("tambah_data", { error: 'An error occurred while uploading files' });
        } else if (err) {
            return res.status(500).json({ error: 'An error occurred while uploading files' });
        }
        // Successful upload logic
        res.render("tambah_data", { success: 'File uploaded successfully!' });
    });
};

