import qrCode from 'qrcode';

export default ()=> {return {
    restrict: 'AE',
    scope: {
        content: '='
    },
    template: `<img width="100%"></img>`,
    link: (scope, elm, attrs) => {
        console.log(elm);
        qrCode.toDataURL(scope.content || '' ,  {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            rendererOpts: {
              quality: 1
            }
          }, function (error, url) {
            if (error) console.error(error)
            else {
                elm.find('img')[0].src=url;
            }
          })
    }
}
}