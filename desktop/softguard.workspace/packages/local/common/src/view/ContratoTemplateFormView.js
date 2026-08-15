Ext.define('Common.view.ContratoTemplateFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.contratotemplateformview'],
    title : 'Order',
    frame : false,   
    autoScroll:true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 75,
        labelAlign: 'left', 
        editable:false,
        width:'100%'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items : [
        {
            xtype:'panel',
            title:'Configuración del template',
            bodyPadding: 5,
            margin: '0 5 0 0',
            flex:1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[
                {
                    xtype : 'combo',        	
                    name : "tmp_itipo",
                    queryMode: 'local',
                    itemId: 'tmp_itipo',
                    editable: false,
                    fieldLabel:'Tipo',
                    store:[
                        [1,getLocale('Contrato')],
                        [3,getLocale('Header de contrato')]
                        ],
                    disabled:true
                        
                },{
                    xtype : 'combo',			
                    name : "tmp_iorganizacion",
                    displayField : 'org_cnombre',
                    queryMode: 'local',
                    itemId: 'organizaciones',
                    valueField : 'Id',
                    editable: false,
                    fieldLabel:'Empresa'
                        
                },{
                    xtype : 'combo',    		
                    name : "",
                    displayField : 'tmp_asunto',
                    queryMode: 'local',
                    itemId: 'headertemplate',
                    valueField : 'Id',
                    editable: false,
                    fieldLabel:'Cabecera de contrato'
                        
                },{
                    xtype:'textfield',
                    name:'tmp_asunto',
                    fieldLabel:'Descripción template'
                    
                },{
                    xtype:'container',
                    layout:'hbox',
                    margin:'0 0 5 10',
                    itemId:'btntemplates',
                    items:[
                            {
                                xtype : 'button',
                                text : 'Datos del template',
                                margin: '0 5 0 0',
                                menu: {
                                    xtype: 'menu',
                                    width: 200,
                                    itemId: 'etiquetas',
                                    items: [
                                            
                                    ]
                                },
                                maxWidth : 200
                                
                            },{
                                xtype : 'button',
                                text : 'Datos del contrato',
                                menu: {
                                    xtype: 'menu',
                                    width: 200,
                                    itemId: 'etiquetasfijas',
                                    items: [
                                            
                                    ]
                                },
                                maxWidth : 200
                                
                            }
                        
                        ]
                },{
                    xtype: 'htmleditor',
                    name: 'tmp_cuerpo',
                    fieldLabel: getLocale('Cuerpo'),
                    itemId:'editor',
                    flex:1,
                    getDocMarkup: function() {
                        var me = this,
                            h = me.iframeEl.getHeight() - me.iframePad * 2,
                            oldIE = (Ext.isIE6 || Ext.isIE7 || Ext.isIE8);
                
                        // - IE9+ require a strict doctype otherwise text outside visible area can't be selected.
                        // - Opera inserts <P> tags on Return key, so P margins must be removed to void double line-height.
                        // - On browsers other than IE, the font is not inherited by the IFRAME so it must be specified.
                        return Ext.String.format(
                            (oldIE?'':'<!DOCTYPE html>')
                            + '<html><head><style type="text/css">' 
                            +'table {'+
                            '  border:1px solid black;'+
                            '  border-collapse:collapse;'+
                            '  width:100%;'+
                            '  margin: 0 0 15px 0;'+
                        ' }'+
                        
                        'td {'+
                            ' border:1px solid black;  '+      
                            '  min-height:30px;'+
                            ' padding:1px;'+
                            '  font-size:12px;'+
                        ' }'+
                        ' th {'+
                            '  background:#e7e7e7;'+
                            ' padding:2px;'+
                            ' border:0;'+
                            ' font-size:14px;'+
                            
                        ' }'+
                        ' .firma {'+
                        '     height:40px;'+
                        '     vertical-align:top;'+
                        '  }'
                            + (Ext.isOpera?'p{margin:0}':'')
                            + 'body{border:0;margin:0;padding:{0}px;' 
                            + (oldIE?'':'min-')
                            + 'height:{1}px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:text;background-color:white;' 
                            + (Ext.isIE?'':'font-size:12px;font-family:{2}')
                            + '}</style></head><body></body></html>'
                            , me.iframePad, h, me.defaultFont);
                    },
                    listeners: {
                        sync: function(editor, html){
                            var view = editor.up('contratotemplateformview');
                            var record = view.record;
                            record.set('tmp_cuerpo', html);
                        }
                    }
                }
                
            ]
        },{
            xtype:'panel',
            flex:1,
            title: 'Datos variables',
            layout:'fit',
            itemId:'formbuilderhelperview',
            items:[
                {
                    xtype:'formbuilderhelperview'
                }
            ]
        }
    ],
    
	initComponent : function() {
		this.callParent();

        var meta = [];
        if(this.record.get('tmp_metadata') && this.record.get('tmp_metadata') != '') {
            meta = Ext.decode(this.record.get('tmp_metadata'))
            if(meta && meta.form) {
                meta = meta.form
            }
        } 

        this.down('formbuilderhelperview').fields = meta
        this.down('formbuilderhelperview').caller = this
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-disk',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete'
                }
            ]
         }); 
         this.addDocked(toolbar);
	} 

});
