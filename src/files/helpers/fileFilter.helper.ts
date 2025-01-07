export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  //console.log({ file });

  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const valitExtensions = ['jpeg', 'jpg', 'png', 'gif'];

  if (!valitExtensions.includes(fileExtension)) {
    return callback(null, false);
  }

  callback(null, true);
}