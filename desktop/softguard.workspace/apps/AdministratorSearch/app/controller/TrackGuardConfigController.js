Ext.define('AdministratorSearch.controller.TrackGuardConfigController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
			models : [ 'm_dealer_tgconfigModel', 'm_dealer_tgconfigSearchModel' ],
			views : [ 'TrackGuardConfigView' ],

    refs: [
        {
            ref: 'statusBar',
            selector: '#statusbar'
        }
    ],
    init: function(){
        this.control({
            'trackguardconfigview':{
                afterrender: this.loadData,
                selectedEvents: this.eventsSelected
            },
            'trackguardconfigview #agregarevento':{
                click: this.onAgregarEventClick
            },
            'trackguardconfigview [action=save]': {
                click: this.onSaveClick
            },
            'trackguardconfigview #radiogroup':{
                change: this.onChangeRg
            }            
        });
    },
    onChangeRg: function(_this, newValue, oldValue, eOpts){
        var form = _this.up('trackguardconfigview');
        var mymodel = form.getRecord();
        console.log('newValue: '+newValue.rb);
        console.log('oldValue: '+oldValue.rb);
        if(newValue.rb==1){

            //_this.down('#eventos').setValue('');
            //_this.down('#eventoshide').setValue('');
            
            form.getForm().getFields('rb').items[4].setValue('');
            form.getForm().getFields('rb').items[5].setValue('')
            mymodel.set('dtg_parking_eventos','');
            mymodel.set('dtg_parking_eventos_hide','');
            form.updateRecord(mymodel);
            _this.down('#velocidad').setDisabled(false);
            _this.down('#eventos').setDisabled(true);

        }else{
            
            form.getForm().getFields('rb').items[2].setValue(0);
            mymodel.set('dtg_parking_velocidad',0);
            form.updateRecord(mymodel);
            
            _this.down('#velocidad').setDisabled(true);
            _this.down('#eventos').setDisabled(false);            
            
        }
    },
    loadData: function(panel){
            
            var controller = this;
            var configstore =Ext.create('Ext.data.Store',{
                model: controller.getM_dealer_tgconfigSearchModelModel() ,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property: 'dtg_cdealer',
                        value: panel.record.get('cue_clinea') || panel.record.get('lin_ccodigo')
                    }
                ]
            }).load({callback:function (records) {
                
                var configObj
                if(records && records.length > 0) {
                    notify('Hay metadata del dealer');
                    //panel.currentConfig = records[0];
                    panel.loadRecord(records[0]);
                    if(records[0].data.dtg_parking_velocidad>0)
                        panel.getForm().getFields('rb').items[1].setValue("1");
                    else//if(records[0].data.dtg_parking_eventos!='')
                        panel.getForm().getFields('rb').items[3].setValue("2");
                }else{
                    var myobject = Ext.create('AdministratorSearch.model.m_dealer_tgconfigModel', {
                        //usu_ntipo: 7
                        
                        dtg_cdealer: panel.record.get('cue_clinea') || panel.record.get('lin_ccodigo')
                    });
                    myobject.setId(0);    
                    
                    panel.loadRecord(myobject);    
                    panel.getForm().getFields('rb').items[3].setValue("2");            
                } 
            }});



            /*var myobject = Ext.create('AdministratorSearch.model.m_dealer_tgconfigModel', {
                //usu_ntipo: 7
            }); 
            console.log("myobject: "+myobject);      
            panel.loadRecord(myobject);*/     
    },
    onSaveClick: function(btn){
        var myform = btn.up('form').getForm();
        var view = btn.up('trackguardconfigview');
        var caller = view.caller;
        var win = btn.up('window');
        var mymodel = myform.getRecord();
        myform.updateRecord(mymodel);
        mymodel.save({
            scope: this,
            win: win,
            view: view,
            callback : function(record,operation){
                notify('Los datos se guardaron correctamente');
                var mywin = operation.win;
                var view = operation.view;
                if(view){
                    view.fireEvent('objectchanged',operation);
                    if(mywin){
                        mywin.close();
                        caller.store.load();
                    }
                }
            }
        });

    },
    onAgregarEventClick: function (btn) {
        var view = btn.up('trackguardconfigview');
        var recForm = view.getForm().getRecord()
        var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                eventSelected: view.down('#eventoshide').getValue(),
                caller: view
                
            }],
            layout: 'fit'
        }).show();
    },
    eventsSelected: function(records, view) {
          var textarea = view.down('#eventos');
       
        var text = '';
        
        var arrayEventos = [];
        Ext.Array.each(records.items, function(record){
            if (record){
                text = text + record.get('Descripcion')+'\r\n';
                arrayEventos.push(record.get('cod_ccodigo'));
            }
        })
    
        
        textarea.setValue(text);
     
        view.down('#eventoshide').setValue(arrayEventos.join(','));
    }/*,
    eventsSelected: function(records, view) {
          var textarea = view.down('#eventos');
       
        var text = '';
        
        var arrayEventos = [];
        Ext.Array.each(records.items, function(record){
            if (record){
                text = text + record.get('Descripcion')+'\r\n';
                arrayEventos.push(record.get('cod_ccodigo'));
            }
        })
    
        
        textarea.setValue(text);
     
        view.down('#eventoshide').setValue(arrayEventos.join(','))
    },
    bindEventosHide: function(){

    }*/        
});