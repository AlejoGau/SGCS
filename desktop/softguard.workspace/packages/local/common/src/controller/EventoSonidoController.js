//MIGRADO2024
Ext.define('Common.controller.EventoSonidoController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [ 'p_rximgSearchModel' ],
            views : [ 'EventSoundView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventsoundview': {
                afterrender: this.initView
            },
            'eventsoundview #playsound' : {
                click : this.onPlaySoundClick
            },
            'eventsoundview #stopsound' : {
                click : this.onStopSoundClick
            }
        });
    }, // cierro init
    
    initView: function (view) {
        
        //this.getSound(view.record, view)
        var record = view.record;
        
        var store = Ext.create('Ext.data.Store', {
            model : this.getP_rximgSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            filters:[{
                property: 'rxi_irecid',
                value: record.get('rec_iid')
            },{
                property: 'rxi_cTipo:IN',
                value: 'mp4,mp3'
            }]
        });
        
       // view.bindStore(store);
        store.load({callback:function (records) {
           store.each(function(record){
               var arrPath = record.get('rxi_cImg').split('\\');
               var soundPath;
               // PARCHE para dividir en tre smartpanics y el resto
               if (arrPath[arrPath.length-1].toUpperCase().indexOf('MP4') == -1 && arrPath[arrPath.length-1].toUpperCase().indexOf('MP3') == -1){
                   // NO es SP
                   var folder = record.get('rxi_cCarpeta');
                   var filename = record.get('rxi_cImg');
                   soundPath = '/rest/upload/get?search=softguardMiscFile&download=false&path=\\video\\'+folder+'&filename=';// en smartpanics y los otros es diferente
               } else{
                   // es SP
                   soundPath = "/gallery/SharedImages/PostImages/"+arrPath[arrPath.length-1];
               }
               /*view.add(Ext.create('Ext.ux.IFrame', {
                            title : "",
                            border : false,
                			src : soundPath ,
                			closable : false,
                            autoDestroy: true,
                            height:50
                		}));*/
                        view.add(Ext.create('Ext.Component', {
                            //html: '<iframe src="'+soundPath+'" style="height:50px; width:100%" />',
                            html:'<audio controls style="width: 100%; margin: 5px 0 5px 0;"><source src="'+soundPath+'" type="audio/mpeg">Your browser does not support the audio element.</audio>',                            
                            height:50,
                            width:'100%'
                        }))
           })
           
        
        }});
        
    },
    getSound: function(record,view){
        Ext.Ajax.request({
              url: '/Rest/search/p_rximg',
              params: { 
                  rxi_irecid: record.get('rec_iid'),
                  rxi_cTipo: 'mp4'                  
              },
              method: 'GET',
              scope: this,
              success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if(rec) {
                    var arrPath = rec.rxi_cImg.split('\\');
                    view.soundPath = "/gallery/SharedImages/PostImages/"+arrPath[5];
                    view.down('#playsound').show();
                } else {
                    notifyError("El archivo de sonido no se encuentra relacionado.")
                }
              }
        });
        
    }, 
    onPlaySoundClick: function(button, object, options){
        var view = button.up('eventsoundview'); 
        button.hide();
        view.down('#stopsound').show();
        view.snd = new Audio(view.soundPath);
        view.snd.addEventListener("ended", function() 
                 {
                      view.snd.currentTime = 0;
                      view.down('#stopsound').hide();
                      button.show();
                 });
        view.snd.play();
    },
    
    onStopSoundClick: function(button, object, options){
        var view = button.up('eventsoundview'); 
        button.hide();
        view.down('#playsound').show();        
        view.snd.pause();
        view.snd.currentTime = 0;
    },
    
   
});