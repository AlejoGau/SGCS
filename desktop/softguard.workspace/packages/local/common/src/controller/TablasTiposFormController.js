//MIGRADO2024
Ext.define('Common.controller.TablasTiposFormController', {
  extend : 'Ext.app.Controller',
  stores : [ 'Common.store.TablasServiciosPatrullaStore' ],
  models : [ 'TablasTiposModel', 'TablasSeviciosPatrullaSearchModel', 'PoiFileSearchModel', 'TablasTiposSearchModel' ],
  views : [ 'TablasTiposFormView' ],
  init : function(config) {
    // genero los eventos
  this.control({
        'tablastiposformview' : {
          afterrender : this.initview
        },
        'tablastiposformview button[action="save"]' : {
          click : this.onSaveClick
        },
                  'tablastiposformview #combotipo' : {
            change : this.onTipoChange
        },
                  'tablastiposformview #urlimagen' : {
              change : this.onUrlChange
        },
                  'tablastiposformview #comboIconoPoi' : {
              change : this.onIconoChange
        },
                  'tablastiposformview #comboIconoTypeTG' : {
              change : this.onIconoChange
        }
          
              });
}, // cierro init
initview : function(view) {
      var store = Ext.create('Ext.data.Store',{
          model: this.getTablasSeviciosPatrullaSearchModelModel(),
          pageSize: 1000
      })
      
       var combopatrulla = view.down('#combopatrulla');
       
       combopatrulla.bindStore(store);
      
       store.load({callback: function(){
          view.loadRecord(view.record);
       }});
       
      
      var searchName = 'resourcefile';
      
      view.searchName = searchName;
      view.iconoType = 0; //0: any; 1: Poi; 2: TypeTG
      var comboTipoPoi = view.down('#comboIconoPoi');
      
      var storeTipoPoi =Ext.create('Ext.data.Store',{
          model: this.getPoiFileSearchModelModel(),
          searchName: searchName,
          path: '/softguard/images/poi',
          type: 'File',
          pageSize: 500,
          remoteSort: true,
          remoteFilter: true,
          listeners: {
              beforeload: function(store,operation) {
                  operation.scope = store;
              }
          }
      })
      comboTipoPoi.bindStore(storeTipoPoi);
      storeTipoPoi.load({
          callback: function(records, operation, success){
              comboTipoPoi.setValue(view.record.get('tip_curlimagen'));
          }
      });
      var comboTipoTypeTG = view.down('#comboIconoTypeTG');
      
      var storeTipoTypeTG =Ext.create('Ext.data.Store',{
          model: this.getPoiFileSearchModelModel(),
          searchName: searchName,
          path: '/softguard/images/TypeTG',
          type: 'File',
          pageSize: 500,
          remoteSort: true,
          remoteFilter: true,
          listeners: {
              beforeload: function(store,operation) {
                  operation.scope = store;
              }
          }
      })
      comboTipoTypeTG.bindStore(storeTipoTypeTG);
      storeTipoTypeTG.load({
          callback: function(records, operation, success){
              comboTipoTypeTG.setValue(view.record.get('tip_curlimagen'));
          }
      });
},
  
  onIconoChange : function(combo, value, old, options) {
      var view = combo.up('tablastiposformview');
      var icono = view.down('#urlimagen');
      icono.setValue(value);
  },
onSaveClick : function(button, event, options) {
  // cambio la cantidad de columnas al panel
  // accedo al registro y lo salvo
  var myform = button.up('form').getForm();
      var view = button.up('tablastiposformview');
      var win = button.up('window');
  var record = myform.getRecord();
  myform.updateRecord(record);
      
      if (record.get('DateCreated') == null){
          record.set('DateCreated',new Date(-62135586000000));
      }
      if (record.get('tip_nTipo') == 4 && record.get('tsp_ccodigo') == ''){
          myform.findField('tsp_ccodigo').markInvalid(getLocale('Debe completar el servicio patrulla'));
      }
      
      record.set('tip_nCondicion',this.getCondicion(record.get('tip_nTipo')));
      record.set('tip_ccodigo',Ext.String.leftPad(record.get('tip_ccodigo'),3,'0').toUpperCase());
      var oldproxy = record.getProxy();
      var model = this.getTablasTiposModelModel();
      record.setConfig({
				proxy: model.getProxy()
			});
      if (myform.isValid()){
      record.save({
        scope : this,
              win: win,
              view: view,
        callback : function(record, operation) {
                  if (operation.success){
                      var win = view.up('window');           
                      notify('Los datos se guardaron correctamente');
                      view.caller.fireEvent('objectchanged',view.caller,record);
                      win.close();
                  } else {
                      notifyError('Hubo un error al guardar los datos');
                  }
                  
        },
        button : button
      });
      }
},
  
  //onTipoSelect : function(combo, records, options) {
  onTipoChange : function(combo, value, old, options) {
      var view = combo.up('tablastiposformview');
      var tipo = view.down('#condicion');
      var combopatrulla = view.down('#combopatrulla');
      var icongroupPoi = view.down('#icongroupPoi');
      var icongroupTypeTG = view.down('#icongroupTypeTG');
      
      switch(value)
      {
      case 0: // otros
        tipo.setValue(0);
        combopatrulla.show();
        view.iconoType = 1;
        break;
      case 1: // vehiculo
        tipo.setValue(1);
        combopatrulla.show();
        view.iconoType = 2;
        break;
      case 2: // persona
        tipo.setValue(1);
        combopatrulla.show();
        view.iconoType = 2;
        break;
      case 3: // mascota
        tipo.setValue(1);
        combopatrulla.show();
        view.iconoType = 2;
        break;
      case 4: // patrulla
        tipo.setValue(2);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 5: // Vigicontrol
        tipo.setValue(3);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 6: // Cercos
        tipo.setValue(4);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 7: // Unidad Funcional
        tipo.setValue(0);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 8: // Acceso
        tipo.setValue(0);
        combopatrulla.hide();
        view.iconoType = 1;
        break;
      case 9: // CLeanApp
        tipo.setValue(0);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 10: // SmartPanicsPC
        tipo.setValue(0);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 11: // Tecguard
        tipo.setValue(0);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 12: // Candado
        tipo.setValue(5);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      case 12: // Camara
        tipo.setValue(6);
        combopatrulla.hide();
        view.iconoType = 0;
        break;
      
      }
      switch(view.iconoType)
      {
        case 0:
          icongroupPoi.hide();
          icongroupTypeTG.hide();
          break;
        case 1:
          icongroupPoi.show();
          icongroupTypeTG.hide();
          break;
        case 2:
          icongroupPoi.hide();
          icongroupTypeTG.show();
          break;
      }
  },
  
  getCondicion: function(tipo){
      switch(tipo)
      {
      case 0: // otros
        return 0
        break;
      case 1: // vehiculo
        return 1
        break;
      case 2: // persona
        return 1
        break;
      case 3: // mascota
        return 1
        break;
      case 4: // patrulla
        return 2
        break;
      case 5: // Vigicontrol
        return 3
        break;
      case 6: // Vigicontrol
        return 4
        break;
      case 12: // Candado
        return 5
        break;
      case 13: // Camara
        return 6
        break;
      }
  },
  onUrlChange : function(combo, value, old, options) {
      var view = combo.up('tablastiposformview');
      
      if (value){
          if (view.iconoType==1){
            var imagenPoi = view.down('#imagenPoi');
            imagenPoi.setSrc('/resources/softguard/images/poi/' + value);
            imagenPoi.show();
          } 
          if (view.iconoType==2){
            var imagenTypeTG = view.down('#imagenTypeTG');
            imagenTypeTG.setSrc('/resources/softguard/images/TypeTG/' + value);
            imagenTypeTG.show();
          }
      }
       
  }
});