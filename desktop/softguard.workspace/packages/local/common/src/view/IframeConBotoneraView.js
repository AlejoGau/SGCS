//MIGRADO2024
Ext.define('Common.view.IframeConBotoneraView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.iframeconbotonera',    
    layout: {
        type: 'fit'
    },   
    height:'100%',
    items:[{
        xtype:'uxiframe',
        itemId:'uxiframe',
        title : "",
        border : false,
        flex: 1,
        closable : false,
        autoDestroy: true
    }],
    
    initComponent: function () {
        this.callParent(arguments);
        var t = this;
        var _iframe =  t.down('uxiframe');
        this.on('afterrender',function () {
           //_iframe.setSrc(this.src)
           _iframe.load({
                src: this.src
            });
        })
        _iframe.on('fileNotFound',function(){
            t.fireEvent('fileNotFound');
        })
        
        if(!this.noToolbar) {
            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                items: [
                    {
                        xtype:'container',
                        itemId:'dguardbotonera',
                        hidden:true,
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-vivo',
                                tooltip: 'En vivo',
                                itemId: 'imgprevVivo',
                                toggleGroup: 'videotime'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-0',
                                tooltip: 'Hora del evento',
                                itemId: 'imgprev0',
                                toggleGroup: 'videotime',
                                pressed:true
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-1',
                                tooltip: 'Un minuto antes',
                                itemId: 'imgprev1',
                                toggleGroup: 'videotime'
                            },{
                                xtype: 'button',
                                iconCls: 'icon-dguard-5',
                                tooltip: '5 minutos antes',
                                itemId: 'imgprev5',
                                toggleGroup: 'videotime'
                            },{
                                xtype: 'button',
                                iconCls: 'icon-dguard-10',
                                tooltip: '10 minutos antes',
                                itemId: 'imgprev10',
                                toggleGroup: 'videotime'
                            }
                        ]
                    },{
                        xtype:'container',
                        itemId:'dahuabotonera',
                        hidden:true,
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-vivo',
                                tooltip: 'En vivo',
                                itemId: 'dahuaenvivo',
                                toggleGroup: 'videotime',
                                text:'En vivo'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-0',
                                tooltip: 'Hora del evento',
                                itemId: 'dahuahoraevento',
                                toggleGroup: 'videotime',
                                pressed:true,
                                text:'Hora del evento'
                            }
                        ]
                    },{
                        xtype:'container',
                        itemId:'webmbotonera',
                        hidden:true,
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-vivo',
                                tooltip: 'En vivo',
                                itemId: 'webmenvivo',
                                toggleGroup: 'webm',
                                text:'En vivo'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-dguard-0',
                                tooltip: 'Video grabado',
                                itemId: 'webmevento',
                                toggleGroup: 'webm',
                                pressed:true,
                                text:'Video grabado'
                            },{
                                xtype: 'button',
                                iconCls:'x-tbar-loading',
                                text:'Refrescar',
                                handler: function () {                                               
                                    t.down('uxiframe').setSrc(t.src)                                                
                                }                            
                            },
                        ]
                    }
                ]// cierro items
            }); 
            this.addDocked(toolbar);
        }
    }
});