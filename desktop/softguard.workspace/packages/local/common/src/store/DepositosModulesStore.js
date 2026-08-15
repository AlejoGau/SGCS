//MIGRADO2024
Ext.define('Common.store.DepositosModulesStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'DepositiosModulesStore',
    data : [
		{
			text : 'Deposito',
			iconCls : 'icon-building',
			leaf : true,
			profile: '0',
			view : 'stdepositoformview'
		},{
			text : 'Movimientos',
			iconCls : 'icon-arrow-switch',				
			leaf : true,
			closable: true,
			profile: '0',
			view : 'mstockcabeceraview'
		},{
			text : 'Stock',
			iconCls : 'icon-box',				
			leaf : true,
			closable: true,
			profile: '0',
			view : 'm_stock_totalesgridview'
		}
            
            
    ]
});