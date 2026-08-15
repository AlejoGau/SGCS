//MIGRADO2024
Ext.define('Common.controller.VideoPreviewController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [  ],
    views : [ 'VideoPreviewView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'videopreviewview' : {
                afterrender : this.initView,
                close: this.onClose,
                hide: this.onClose,
                destroy: this.onClose,
                activate: this.onActivate,
                show: this.onActivate
            },
            'videopreviewview #imgprev0' : {
                click : this.onImgPrev0Click
            },
            'videopreviewview #imgprevVivo' : {
                click : this.onImgPrevVivoClick
            },
            'videopreviewview #imgprev1' : {
                click : this.onImgPrev1Click
            },
            'videopreviewview #imgprev5' : {
                click : this.onImgPrev5Click
            },
            'videopreviewview #imgprev10' : {
                click : this.onImgPrev10Click
            },
            'videopreviewview #dahuaenvivo' : {
                click : this.onImgDahuaEnVivoClick
            },
            'videopreviewview #dahuahoraevento' : {
                click : this.onImgDahuaHoraEventoClick
            },
            'videopreviewview #webmenvivo' : {
                click : this.onImgWebmEnVivoClick
            },
            'videopreviewview #webmevento' : {
                click : this.onImgWebmEventoClick
            }
		});
	}, // cierro init
    
    
    
    initView: function(view){
        var record = view.record;
        
        // Previo a que MapGuard requiera video
        // var cue_iid = record.get('cue_iid');
        
        // Post MapGuard requiera video
        /* Agrego el flag Mapguard para leer el JSON correspondiente a la view */
        var cue_iid = view.mapguard?record:record.get('cue_iid');
        var controller = this;       
        var seconds = view.seconds?view.seconds:1;
        if (view.hideToolbar){
            view.down('toolbar').hide();
        }
        view.activated= true;
        var storeLlave = KeyModulesStore;//this.getKeyModulesStoreStore();
        
        if(storeLlave.isModuleAvailable('Video')) {
            this.callVideo(seconds, view);
        }
    },
    
    callVideo: function(seconds,view){
        var controller = this;
        var size = view.size;
        var record = view.record;
        
        // Previo a que MapGuard requiera video
        //var rec_iid = record.get('rec_iid');
        //var rec = record.data;
        
        // Post MapGuard requiera video
        /* Agrego el flag Mapguard para leer el JSON correspondiente a la view */
        
        var rec = view.mapguard?record:record.data;    
        var rec_iid = view.mapguard?record:record.get('cue_iid');
        var currentDate = new Date();
        var prevDate = Ext.Date.add(currentDate, Ext.Date.SECOND, seconds);
        
        view.videolink = rec;
        if (rec && rec.tvi_nLaunch =="1") {
            var sgvideo = 'SGVIDEO';
            //if (rec.get('tvi_iplatform') == 1){
            //    sgvideo = sgvideo+'X64';
            //}
            var src = sgvideo+'://';
            var cvl_clink = rec.cvl_clink;
            if (!cvl_clink){
                cvl_clink = rec.cuv_clink;
            }
            src += cvl_clink.substring(0, 4)+'|';
            
            if (cvl_clink.indexOf("hik-online")!=-1){ // dejo solo hik-online pedido por pablo
                // es hik cambio los separadores
                // cuento la cantidad de /
                var count = cvl_clink.split('/').length - 1;
                if (count > 4){
                    for (i = 0; i < count - 4; i++)
                    {
                        cvl_clink = cvl_clink.replace('/','%');
                    }   
                }
            }
            var HIKVISIONP2P = getParametro('HIKVISIONP2P', true,true).get('_par_cvalor')
                //para hik se agrega los campos keyapp
            if(rec.tvi_iid == 34) {
                    var jsonvideo = {
                    VideoLink:cvl_clink,
                    Dealer:rec.cue_clinea,
                    Cuenta:Ext.String.trim(rec.cue_ncuenta),
                    Contenido:'',
                    RecID:'',
                    RemoteHostIP: '',
                    TiempoFotos:'0',
                    UrlDesktop:getParametro('URLDESKTOP'),
                    DesktopExternalUrl: getParametro('DESKTOPEXTERNALURL'),
                    RestURLdeUpLoad:'/rest/upload/new?search=softguardMiscFile&Path=/videoverificacion',
                    TokenURLdeUpLoad:'oauth_token='+Ext.util.Cookies.get('OAuth_Token'),
                    DiasBorrado: '5',
                    KeyAppKey:HIKVISIONP2P.KeyAppKey,
                    KeyAppSecret:HIKVISIONP2P.KeyAppSecret,
                    IdiomaMSJ:_UserData.metadata.language
                    //IdiomaMSJ:t.application.UserData.metadata.language
                }
            } else {
                var jsonvideo = {
                    VideoLink:cvl_clink,
                    Dealer:rec.cue_clinea,
                    Cuenta:Ext.String.trim(rec.cue_ncuenta),
                    Contenido:'',
                    RecID:'',
                    RemoteHostIP: '',
                    TiempoFotos:'0',
                    UrlDesktop:getParametro('URLDESKTOP'),
                    DesktopExternalUrl: getParametro('DESKTOPEXTERNALURL'),
                    RestURLdeUpLoad:'/rest/upload/new?search=softguardMiscFile&Path=/videoverificacion',
                    TokenURLdeUpLoad:'oauth_token='+Ext.util.Cookies.get('OAuth_Token'),
                    DiasBorrado: '5',
                    IdiomaMSJ:_UserData.metadata.language
                    //IdiomaMSJ:t.application.UserData.metadata.language
                }
            }
            
            
            src += Ext.encode(jsonvideo).replace(/\"/g,'\'');
            
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            view.iframSrc = src;
            view.down('#dguardbotonera').hide();
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
        		src : src ,
    			closable : false,
                autoDestroy: true
    		})); 
        }
        else if(rec && rec.tvi_iid == 24){
            var objConfig;
            if (rec.cvl_clinkdss)
            objConfig = Ext.JSON.decode(rec.cvl_clinkdss);
            else if (rec.cuv_cLinkDSS)
            objConfig = Ext.JSON.decode(rec.cuv_cLinkDSS);
            // me fijo si tiene layout configurado para hacer sinc con el servidor.
            if (objConfig && objConfig.formdata._layout){
                // como el server esta en otro dominio tengo que usar el proxy interno por cross domain.
                var url = '/handler/AuthBasicRequestHandler?http://';
                url += objConfig.formdata._user+':'+objConfig.formdata._password+'@';
                url += objConfig.formdata._uri+':'+objConfig.formdata._port+'/setlayout.cgi';
                url += '?layout='+objConfig.formdata._layout
                url += '&monitor='+objConfig.formdata._monitor;
                Ext.Ajax.request({
                  url: url, //setlayout.cgi?layout=Layout2&monitor=1
                  method: 'GET',
                  success: function(resp,operation) {
                    //notify('Se sincronizó la terminal d-guard');
                  }
                });
            }
            
            // tiene imagen d-guard muestro el iframe
            // parseo el rxi_cImg 
            view.setTitle("Video");
            
            var dir =  objConfig.formdata._uri+':'+objConfig.formdata._port;
            var camara = objConfig.formdata._camara;
            var user = objConfig.formdata._user;
            var pass = objConfig.formdata._password?objConfig.formdata._password:"";
            
            var src = "/handler/dguardViewer";
            src = Ext.String.urlAppend(src, "link="+dir);
            src = Ext.String.urlAppend(src, "user="+user);
            src = Ext.String.urlAppend(src, "camara="+camara);
            src = Ext.String.urlAppend(src, "pass="+pass);
            
            
            if(seconds != 0){
                src = Ext.String.urlAppend(src, "prevDate="+Ext.Date.format(prevDate, 'c'));
            }
            
            if (size){
                src = Ext.String.urlAppend(src, "size="+size);
            }
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            
            view.iframSrc = src;
            view.down('#dguardbotonera').show();
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
        		src : src ,
    			closable : false,
                autoDestroy: true
    		})); 
        } else if(rec && rec.tvi_iid == 22){
            view.setTitle("Video");
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            
            var objConfig = Ext.JSON.decode(rec.cvl_clinkdss);
            
            if (!objConfig){
                objConfig = Ext.JSON.decode(rec.cuv_cLinkDSS);
            }
            
            var path = objConfig.formdata._rtsplink
            
            url = 'rtsp://'+path
            var src = '/handler/VideoTranscodeStream';
            if (objConfig.formdata._rtsptcpforce!='false'){
                src = Ext.String.urlAppend(src,'forceTcp=true');
            }
            
            src = Ext.String.urlAppend(src,'rtsp='+ url.replace(/&/g, "%26"));
            view.iframSrc = src;
            
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
            	src : src ,
    			closable : false,
                autoDestroy: true
    		}));
        } else if(rec && rec.tvi_iid == 19){
            view.setTitle("Video");
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            var url;
            var objConfig = Ext.JSON.decode(rec.cvl_clinkdss);
            
            if (!objConfig){
                objConfig = Ext.JSON.decode(rec.cuv_cLinkDSS);
            }
            
            var pass = objConfig.formdata._password;
            var user = objConfig.formdata._user;
            var uri = objConfig.formdata._uri;
            var port = objConfig.formdata._port;
            var camara = objConfig.formdata._camara;
            
            
            var url = 'rtsp://'+user+':'+pass+'@'+uri+':'+port+'/cam/realmonitor?channel='+camara+'&subtype=1'
            
            var src = '/handler/VideoTranscodeStream?forceTcp=true&rtsp='+ url.replace("&", "%26");
            view.iframSrc = src;
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
                src : src ,
    			closable : false,
                autoDestroy: true
    		}));
               
            
        } else if(rec && rec.tvi_iid == 9 || rec.tvi_iid == 30){
            view.setTitle("Video");
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            var url;
            var objConfig;
            
            if (rec.cvl_clinkdss){
                objConfig = Ext.JSON.decode(rec.cvl_clinkdss);
            }else{
                objConfig = Ext.JSON.decode(rec.cuv_cLinkDSS);
            }
            
            
            var pass = objConfig.formdata._password;
            var user = objConfig.formdata._user;
            var uri = objConfig.formdata._uri;
            var port = objConfig.formdata._port;
            var camara = objConfig.formdata._camara;
            
            url = 'rtsp://'+user+':'+pass+'@'+uri+':'+port+'/MPEG-4/ch'+camara+'/sub/av_stream'
            
            
            var src = '/handler/VideoTranscodeStream?forceTcp=true&rtsp='+ url.replace("&", "%26");
            view.iframSrc = src;
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
                src : src ,
        		closable : false,
                autoDestroy: true
    		}));
            
        } else if(rec && rec.tvi_iid == 12){
            view.setTitle("Video");
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            var url;
            
            
            url = 'c:\\SoftGuard.Final\\Misc\\video\\'+rec.rxi_cCarpeta+'\\'+rec.rxi_cImg+'.AVI';
            
            
            var src = '/handler/VideoTranscodeStream?rtsp='+ url.replace("&", "%26");
            view.iframSrc = src;
            view.down('#dahuabotonera').hide();
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
                src : src ,
            	closable : false,
                autoDestroy: true
    		}));        
        } else if(rec && rec.tvi_iid == 36){
            view.setTitle("Video");
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            var url;
            var objConfig = Ext.JSON.decode(rec.cvl_clinkdss);
            
            if (!objConfig){
                objConfig = Ext.JSON.decode(rec.cuv_cLinkDSS);
            }
            url = objConfig.formdata._url;
            var src = '/handler/GenericSnapshotUrlPlayer?url='+ url;
            view.iframSrc = src;
            view.down('#dahuabotonera').hide();
            view.add(Ext.create('Ext.ux.IFrame', {
                title : "",
                border : false,
                src : src ,
                closable : false,
                autoDestroy: true
    		}));        
        }  else {
            
            /* 23/07/2018
             * Agregado cuando estas abriendo desde MapGuard la camara para indicar que no tiene video
             */
            view.setTitle("Video");
            var iframe = view.down('uxiframe');
            if (iframe){
                Ext.destroy(iframe);
            }
            var url;
            view.add(Ext.create('Ext.panel.Panel', {
                title : "",
                border : false,
                height : 200,
                width: 300,
                items : [{
                    xtype : 'label',
                    width : '100%',
                    html : 'No hay video disponible'
                }]
            })); 
            
        }
    },
    
    onImgDahuaEnVivoClick: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo('envivo', view);
    },
    
    onImgDahuaHoraEventoClick: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo('horaevento', view);
    },
    
    onImgWebmEnVivoClick: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo('envivo', view);
    },
    
    onImgWebmEventoClick: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo('horaevento', view);
    },
    onImgPrevVivoClick: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo(0, view);
    },
    onImgPrev0Click: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo(-1, view);
    },
    onImgPrev1Click: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo(-60, view);
    },
    onImgPrev5Click: function(button, object, options){
        var view = button.up('videopreviewview');
        button.toggle(true);
        this.callVideo(-300, view);
    },
    onImgPrev10Click: function(button, object, options){
        var view = button.up('videopreviewview'); 
        button.toggle(true);
        this.callVideo(-600, view);
    },
    
    onClose: function(view){
        iframe = view.down('#Iframe');
        Ext.destroy(iframe);
        
        var imagepanel = view.down('eventimagesgridview');
        if (imagepanel){
            Ext.destroy(imagepanel);
        }
    },
    
    onActivate: function(view){
        if (view.activated)
            this.callVideo(1,view);
    }
});