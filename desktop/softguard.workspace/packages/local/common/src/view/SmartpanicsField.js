//MIGRADO2024
Ext.define('Common.view.SmartpanicsField', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.smartpanicsfield',
    title : 'Smartpanics',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width:'100%',
    getValue: function () {
        console.log(this)
        return this.down('#codevento').getValue()?this.down('#codevento').getValue().replace(/,/g, ';'):''
    },
    setValue: function (values) {
        console.log(this)
        var view = this;
        
        var codigos = values.split(',')
        
        if(codigos.length == 1) {
            
        } else if(codigos.length > 1) {
            
            view.down('#deleteEvent').show()
        } else {
            view.down('#deleteEvent').hide()
        }
            
            var codigoalarmaStore  =Ext.create('Ext.data.Store',{
                model: 'Common.model.SmartPanicSearchModel',
                pageSize: 1000,
                remoteSort: false,
                filters: [{
                    property:'Id:ININT',
                    value: values.replace(/;/g, ',') //por si llega con punto y coma (;)
                }],
                remoteFilter: true,
                sorters: [
                        { 
                            property: 'Id',
                            direction:'ASC'
                        }
                    ]
            })
            
            codigoalarmaStore.load({callback:function (records) {
                
                var descripciones = [];
                Ext.Array.each(records, function (rec) {
                    descripciones.push(rec.get('Nombre'))
                })
                    
               
                    
               view.down('#deleteEvent').show()                    
               view.down('#nombreevento').setValue(descripciones.join(' ,'))
                   
                
            }})
            
            
            
        
        
        this.down('#codevento').setValue(codigos.join(','))
        
        
    },
    items : [
       {
            xtype:'button',
            itemId: 'evento',
            text:'Seleccione un smartpanics',
            margin:'0 10 0 0'
        },{
            xtype:'button',
            itemId:'deleteEvent',
            iconCls: 'icon-cancel',
            margin:'0 5 0 0',
            hidden:true
        },{
            xtype:'displayfield',
            itemId:'nombreevento'
        },{
            xtype:'displayfield',
            itemId:'codevento',
            hidden:true
        }
    ],
    
    
    
    initComponent: function () {
        this.callParent(arguments);
        //this.addEvents('selectedEvents');        
        
        if(this.title!= '') {
            this.setTitle(this.title)
        }
        
        
        
       
         
    } // cierro init
});