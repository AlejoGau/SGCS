Ext.define('Common.view.AvisoProgramadoHelperView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.avisoprogramadohelperview'],
    title : '',
    frame : false,   
    autoScroll:true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 250,
        labelAlign: 'left', 
        editable:false,
        width:'100%'
    },
    items : [
        {
          xtype:'textfield',
          name:'Name',
          fieldLabel:'Asunto',
          itemId:'name',
          allowBlank : false
        },{
            xtype:'datefield',
            name:'prg_prgdatetime',
            fieldLabel:'Fecha de envio',
            itemId:'prg_prgdatetime',
            allowBlank : false
        },{
            xtype:'fieldset',
            title:'Destinatarios',
            items:[
                    {
                        xtype: 'button',           
                        text: 'Agregar mi usuario',
                        itemId:'agregaryo'
                    },{
                        xtype: 'combo',           
                        
                        queryMode: 'local',
                        fieldLabel: 'Contactos de organizacion',
                        lastQuery: '',
                        name:'',
                        itemId:'organizacion',
                        displayField: 'Name',
                        valueField: 'Email'
                    },{
                        xtype: 'combo',           
                        
                        queryMode: 'local',
                        fieldLabel: 'Contactos usuario',
                        lastQuery: '',
                        name:'',
                        itemId:'organizacionusuario',
                        displayField: 'Name',
                        valueField: 'Email'
                    },
                    
                    
                    {
                        xtype:'textarea',
                        name:'prg_to',
                        itemId:'to',
                        allowBlank : false
                    }
                
                ]
        },{
            xtype:'container',
            layout:'hbox',
            margin:'0 0 5 0',
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
                        hidden:true, //[Adrian] 12/07/2018 - lo saque por que el template que usa no tiene esto
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
            xtype:'displayfield',
            fieldLabel:'Cuerpo'
        },{
            xtype: 'htmleditor',
            name: 'prg_mensaje',
            fieldLabel: '',
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
                    var view = editor.up('avisoprogramadohelperview');
                    var record = view.record;
                    record.set('prg_mensaje', html);
                }
            }
        },{
            xtype: 'combo',
            store:[
                [0, getLocale('Pendiente')],
                [1, getLocale('Activo')]
                ],
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Estado',
            lastQuery: '',
            name:'prg_estado',
            value:1,
            disabled:true,
            hidden:true
        },{
            xtype:'checkbox',
            fieldLabel:'Adjuntar Contrato',
            itemId:'adjuntarcontrato'
        }
        
    ],
    
	initComponent : function() {
		this.callParent();
      
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    itemId: 'save'
                },'-',{
                    xtype: 'combo',
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: 'Aplicar Template',
                    lastQuery: '',
                    displayField: 'tmp_asunto',
                    valueField: 'Id',
                    itemId:'templates',
                    value:'',
                    width:350,
                    fieldWidth:110
                },{
                    iconCls: 'icon-plugin-go',
                    text: 'Applicar template',                    
                    itemId: 'templateapply'
                }
            ]
         }); 
         this.addDocked(toolbar);
	} 

});