//MIGRADO2024
Ext.define('Common.view.EventImagesGridView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventimagesgridview',
    //title : 'Imagenes',
    _title: 'Imagenes',
    layout:'fit',
    autoScroll: true,
	items : [
           /* {
                xtype:'dataview',
                itemId: 'images-view',
                itemSelector:'thumb-wrap',
                preserveScrollOnRefresh: true,
                
                loadMask: false,
                emptyText: 'Sin imágenes para mostrar',
                tpl: [
                    '<tpl for=".">',
                        '<div class="thumb-wrap" id="{id}-{name:stripTags}">',
                            '<div class="thumbW"><img src="{url}" title="{dateString}" alt="{dateString}" style="max-width: 100%; max-height: 100%;"></div>',
                        '</div>',
                    '</tpl>',
                    '<div class="x-clear"></div>'
                ],
                //width="400"
                prepareData: function(data) {
                    var folder = data.gri_ccarpeta;
                    var filename = data.gri_carchivo;
                    var url = '/rest/upload/get?search=softguardMiscFile&download=false&path=\\video\\'+folder+'&filename='+filename+'.jpg';
                    Ext.apply(data, {
                        id: this.id,
                        name: filename,
                        url: url,
                        dateString: Ext.Date.format(data.gri_isofechahora, "Y/m/d H:i:s")
                    });
                    return data;
                }
            }*/
            
            {
                xtype: 'uxiframe',                                                            
                itemId: 'imagenesSlider',
                border : false,
                autoHeight:true,
                scroll: false
            }
    ],
    initComponent: function(){
        this.callParent();
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items : [{
                    text : 'Mostrar posteriores',        			
                    itemId: 'imagenes'
			    },{
                    type: 'button', 
                    iconCls:'icon-arrow-rotate-anticlockwise',
                    handler: function(btn){
                        
                        var iframe = btn.up('eventimagesgridview').down('#imagenesSlider');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.rotateRight();
                        
                    }
                },{
                    type: 'button', 
                    iconCls:'icon-arrow-rotate-clockwise',
                    handler: function(btn){
                        
                        var iframe = btn.up('eventimagesgridview').down('#imagenesSlider');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.rotateLeft();
                        
                    }
                }]
        }); 
        this.addDocked(toolbar);
    }
})