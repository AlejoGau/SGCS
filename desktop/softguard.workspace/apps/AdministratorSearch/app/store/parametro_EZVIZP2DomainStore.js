Ext.define('AdministratorSearch.store.parametro_EZVIZP2DomainStore', {
    extend: 'Ext.data.Store',
    model: 'AdministratorSearch.model.parametro_EZVIZP2DomainModel',
	storeId: 'parametro_EZVIZP2DomainStore',  
	data: [
		{Name:getLocale("North America"),Id:0,authAddress:'https://iusopenauth.ezvizlife.com',platformAddress:'https://iusopen.ezvizlife.com'},
		{Name:getLocale("South America"),Id:1,authAddress:'https://isaopenauth.ezvizlife.com',platformAddress:'https://isaopen.ezvizlife.com'},
		{Name:getLocale("Oceania"),Id:2,authAddress:'https://iusopenauth.ezvizlife.com',platformAddress:'https://iusopen.ezvizlife.com'},
		{Name:getLocale("Africa"),Id:3,authAddress:'https://ieuopenauth.ezvizlife.com',platformAddress:'https://ieuopen.ezvizlife.com'},
        {Name:getLocale("Europe"),Id:4,authAddress:'https://ieuopenauth.ezvizlife.com',platformAddress:'https://ieuopen.ezvizlife.com'},
		{Name:getLocale("Asia"),Id:5,authAddress:'https://isgpopenauth.ezvizlife.com',platformAddress:'https://isgpopen.ezvizlife.com'},
		{Name:getLocale("Russia"),Id:6,authAddress:'https://irusopenauth.ezvizru.com',platformAddress:'https://irusopen.ezvizru.com'}
	]
});