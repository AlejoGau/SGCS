//MIGRADO2024
Ext.define('Common.view.MultimediaGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.multimediagridview', 
    title: 'Zonas',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    autoHeight: true,
    viewConfig: {
        preserveScrollOnRefresh: true
    },
    itemId:'gridview',
    columns: [
            {
            xtype:'actioncolumn',
            header : 'Ver',
            width:30,
            items: [{
                    iconCls: 'icon-film',
                    tooltip: getLocale('Ver'),
                    getClass: function (val, meta, rec) {
                        if (rec.get('rxi_cTipo') == 'mp3') {
                            //this.items[0].iconCls = 'icon-photo';
                            return 'icon-sound';
                        }
                        return 'icon-film';
                        
                    },
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('multimediagridview');
                        var rec = grid.getStore().getAt(rowIndex);
                      
                        if (view.win){view.win.close();}
                        
                        var path = rec.get('rxi_cImg');
                        var arrPath = Ext.Array.clean(path.split('\\'));
                        var soundPath;
                        var height = 500;
                        var relativeArr = Ext.Array.slice(arrPath,3);
                        var filename = arrPath[arrPath.length-1];
                        soundPath = '/gallery/'+relativeArr.join('/');
                        if(rec.get('rxi_cTipo') == 'mp3') {
                             height = 60;
                        } else if  (rec.get('rxi_cTipo') == 'webm')  {
                             soundPath = "/gallery/SharedImages/ffmpeg/"+arrPath[arrPath.length-1];
                        }
                        else if  (rec.get('rxi_cTipo') == 'WEBM')  { // dedalo parche cliente azocar
                             var carpeta = rec.get('rxi_cCarpeta');
                             var arrCarpeta = Ext.Array.clean(carpeta.split('\\'));
                             
                             soundPath = "/gallery/video/"+arrCarpeta[arrCarpeta.length-2]+'/'+arrCarpeta[arrCarpeta.length-1]+'/'+path;
                        }else if  (rec.get('rxi_cTipo') == 'MP4' || rec.get('rxi_cTipo') == 'mp4')  {
                            
                            /**
                            * 5/4/2018 (Adrian)
                            * se comento el sigueinte codigo por que no funcionaba con paths locales.
                            * se hablo por chat
                            * 
                            * 25/4/2018 (Adrian)
                            * Lo volvi a montar este codigo pero con un if para saber si es local
                            * https://basecamp.com/2249105/projects/14758726/todos/350368220#comment_616536209
                            */
                            
                            /*
                            * 19/6/2018 (dedalo)
                            * modifico nuevamente esta mezclando MP4 y AVI cuando son formatos toalmente diferentes... aparte esta llamando a URL de RTSP.
                            * dejo andando para MP4, el resto esta mal.
                            */
                            /*22/07/2020 DEDALO
                            Modifico para buscar siempre en la carpeta de la cuenta
                             */
                            
                            var accountpath = rec.get('cue_clinea').trim()+'_'+rec.get('cue_ncuenta').trim();
                            var rec_tfechahora = rec.get('rec_tfechahora');
                            var datepath = Ext.Date.format(rec_tfechahora,'Ym');
                            soundPath = '/gallery/video/'+datepath+'/'+accountpath+'/'+filename;
                            
                        } else if (rec.get('rxi_cTipo') == 'AVI'){
                            
                            var carpeta = rec.get('rxi_cCarpeta');
                            carpeta = carpeta.replace('\\','/');
                            soundPath = "/gallery/video/"+carpeta+'/'+path;                            
                             
                            url = carpeta+'\\'+path;                        
                            var d = new Date();
                            var n = d.getTime();
                            soundPath = '/handler/VideoTranscodeStreamWebm?_dc='+n+'&rtsp='+url.replace(/&/g, "%26");
                            
                            
                            
                        }   else if  (rec.get('rxi_cTipo').toUpperCase() == 'MPG')  {
                             var carpeta = rec.get('rxi_cCarpeta');
                             carpeta = carpeta.replace('\\','/');
                             soundPath = "/gallery/video/"+carpeta+'/'+path;
                             
                             
                            url = carpeta+'\\'+path;
                    
                            var d = new Date();
                            var n = d.getTime();
                            soundPath = '/handler/VideoTranscodeStreamWebm?_dc='+n+'&rtsp='+url.replace(/&/g, "%26");
                        }
                        
                        view.win = Ext.widget('window',{
                            title: filename,
                            translate: false,
                            height: height,
                            width: 700,
                            closeAction: 'destroy',
                            autoScroll: false,
                            layout:'fit',
                            items:[
                                {
                                    xtype:'container',
                                    layout:'fit',
                                    itemId: 'fotoImage',
                                    html:'<video controls style="vertical-align: top;height: 100%; width:100%;"><source src="'+soundPath+'" type="video/mp4">'+getLocale("Su browser no soporta video HTML5")+'.</video>',
                                    width:700
                                }
                            ]
                        }).show();
                    }
                }]
            },
            
            {
                xtype : 'datecolumn',
                format : 'd/m/Y H:i',
                dataIndex: 'rec_tfechahora',
                header: 'Fecha',
                sortable: true,
                flex:1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'rxi_cImg',
                header: 'Archivo',
                sortable: true,
                flex:1,
                renderer: function (value, col, rec) {
                   
                    var arrPath = rec.get('rxi_cImg').split('\\');                    
                    return arrPath[arrPath.length-1];
                }
            },{
        			xtype : 'gridcolumn',
					header : 'Evento',
					dataIndex : 'rec_calarma',
					sortable : true,
            		groupable : true,
					renderer : function(value, metadata, record, colIndex,store, view) {
                        var texto ='';
                        var panel = this;
                        if (record.get('rec_calarma')){
                            texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                            
                            var txtColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                            var backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                            metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                            
                        }
                        return texto
                    },
					width : 210
				}
        ],
    initComponent: function () {
        this.callParent(arguments);

        
        this.decimalColorToHTMLcolor = function(number) {
            var intnumber = number - 0;
            var red, green, blue;
    		var template = "#000000";
    	        red = (intnumber&0x0000ff) << 16;
    		green = intnumber&0x00ff00;
    		blue = (intnumber&0xff0000) >>> 16;
    	        intnumber = red|green|blue;
    	
    		var HTMLcolor = intnumber.toString(16);
    	
    	
    		HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
    	
    		return HTMLcolor;
    	};
      //  
        
        var comboSearch =  [
                             ['rec_tfechahora',getLocale('Fecha')],
                           ];
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                    {
                        text : 'Filtros',
                        menu: {
                            xtype: 'menu',
                            width: 280,
                            items: [
                                    {
                                        xtype: 'panel',
                                        bodyPadding: 5,
                                        items: [
                                            {
                                                xtype : 'datefield',
                                                fieldLabel: 'Fecha desde',
                                                itemId:'fechadesde'
                                            },{
                                                xtype : 'datefield',
                                                fieldLabel: 'Fecha hasta',
                                                itemId:'fechahasta'
                                            }
                                        ]
                                     }
                                 ]
                    	    }
                        
        			},{
            		 text:'Buscar',
                     action:'search',
                     iconCls:'icon-find'
        			},{
                	 text:'Todos',
                     action:'todos',
                     iconCls:'icon-find'
        			}
                ]
             }); 
         
         this.addDocked(toolbar);
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
    } // cierro init
});