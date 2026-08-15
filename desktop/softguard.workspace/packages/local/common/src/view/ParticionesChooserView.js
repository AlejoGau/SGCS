//MIGRADO2024
Ext.define('Common.view.ParticionesChooserView', {
    extend : 'Ext.container.Container',
    alias : ['widget.particioneschooserview'],
    //preventHeader: true,
    /*layout: {
         type: 'vbox',
        //align: 'stretch'
    },*/
    autoScroll: true,
    frame : false,
	items : [
       
      
 
        
        ],
	initComponent : function() {
        
		this.callParent(arguments);
       // this.down('particionesgridview').record = this.record;
        //this.down('cuentaroview').record = this.record;
	} // cierro init
});