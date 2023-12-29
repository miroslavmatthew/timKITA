import multer from "multer";
import csv from "fast-csv";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
    conn
} from "../connection/dbConnect.js"
import{
    getSummary,
    insertNewData
} from "../connection/extractdb.js"


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

function uploadCsv(uriFile){
    let stream = fs.createReadStream(uriFile);

    let koloms = [];
    let filestream = csv.parse({delimiter: ';'})
    .on('data', function(data){
        if(!data.includes('')){
            koloms.push(data);
        }
    })
    .on('end', function(data){
        koloms.shift()
        insertNewData(conn, koloms)
    })
    stream.pipe(filestream)
}

export const uploadData = (req, res) => {
    upload.single('data')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.render("tambah_data", { error: 'An error occurred while uploading files' });
        } else if (err) {
            return res.status(500).json({ error: 'An error occurred while uploading files' });
        }
        // Successful upload logic

        var filename = req.file.filename
        uploadCsv('public/upload/' + filename);
        res.render("tambah_data", { success: 'File uploaded successfully!' });
    });
};

export const summarize = async (req, res) => {
    let summary = await getSummary(conn);
    console.log(summary);
    res.send({summary});
}


let kategorikal = ['ID', 'Education', 'Marital_Status']