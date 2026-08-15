//MIGRADO2024
Ext.define('Common.controller.EventSmartpanicsLogController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [  ],
            views : [ 'EventSmartpanicsLogView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventsmartpanicslogview': {
                afterrender: this.initView
            },
            'eventsmartpanicslogview #logDownload': {
                click: this.onDownloadClick
            }
        });
    }, // cierro init
    
    initView: function (view) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var record = view.records[0];
        var currentDate = new Date();
        var aniomes=String(currentDate.getFullYear())+pad(currentDate.getMonth()+1);
        var dealer_cuenta=record.get('cue_clinea')+"_"+record.get('cue_ncuenta');
        
        //view.logfile = "/Gallery/Video/"+aniomes+"/"+dealer_cuenta.trim()+"/"+record.get('grm_cArchivo');
        view.logfile = '/rest/upload/get?search=softguardMiscFile&download=false&path=\\video\\'+aniomes+"\\"+dealer_cuenta.trim()+'&filename='+record.get('grm_cArchivo');
        view.logfileDownload = '/rest/upload/get?search=softguardMiscFile&download=true&path=\\video\\'+aniomes+"\\"+dealer_cuenta.trim()+'&filename='+record.get('grm_cArchivo');
        
        Ext.Ajax.request({
              url: view.logfile,
              method: 'GET',
              scope: this,
              success: function(response){
                view.down('#log').update("<PRE>"+response.responseText+"</PRE>");
              }
        });
    },
    onDownloadClick: function(btn){
        var view = btn.up('eventsmartpanicslogview');
        window.location.href = view.logfileDownload;
    }
});