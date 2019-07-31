export const checkDimension = (file) => {
  return new Promise(resolve => {
    let _URL = window.URL || window.webkitURL;
    var image = new Image();
    image.src = _URL.createObjectURL(file)
    image.onload = function(e ) {
      let dimension = {}
        dimension.width = image.naturalWidth
        dimension.height = image.naturalHeight
      resolve(dimension)   
    };
  })
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}