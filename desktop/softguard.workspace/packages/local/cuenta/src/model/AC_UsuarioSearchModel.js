Ext.define('Cuenta.model.AC_UsuarioSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
        {name: 'Name', type: 'string'},
        {
            name: 'ObjectTypeId',
            type: 'int',
            defaultValue: 3071
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_firmante_fc'
        },
        {name:'usu_iidcuenta',type:'int'},
        {name:'usu_icodigo',type:'int'},
        {name:'usu_cnombre',type:'string'},
        {name:'usu_iid',type:'int'},
        {name:'usu_cclave',type:'int'},
        {name:'usu_ntipo',type:'int'},
        {name:'usu_cimagen',type:'string'},
        {name:'usu_mobservacion',type:'string'},
        {name:'usu_cIdExtendido',type:'string'},
        {name:'usu_cmetadata',type:'string'},
        {name:'usu_teliid',type:'string'},
        {name:'usu_cidentificacion',type:'string'},

        {name:'Name',type:'string'},
        {name:'Brand',type:'string'},
        {name:'Domain',type:'string'},

        {name:'cac_fecha',type:'string'},
        {name:'cac_tipoacceso',type:'int'},

        {name:'cue_ncuenta',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_cnombre',type:'string'},

        {
            name:'_cuenta',
            type:'string',
            convert: function (value, record) {
                return record.get('cue_clinea') + '-' +
                       record.get('cue_ncuenta') + ' ' +
                       record.get('cue_cnombre');
            }
        },

        // 🔹 ESTE ES EL QUE ROMPÍA → lo reescribimos así:
        {
    name: 'DomainManipulated',
    type: 'string',
    convert: function (value, record) {
        var usu_cmetadata = record.get('usu_cmetadata');
        var DomainManipulated = "";

        if (!usu_cmetadata) {
            return "";
        }

        // Si ya viene como objeto, lo uso directo
        if (Ext.isObject(usu_cmetadata)) {
            return usu_cmetadata.domain || usu_cmetadata.patente || "";
        }

        var raw  = String(usu_cmetadata);
        var meta = null;

        // 1) Intento parsear tal cual
        try {
            meta = Ext.JSON.decode(raw);
        } catch (e) {
            // ⚠️ JSON roto, lo intento reparar
            console.warn("AC_UsuarioSearchModel: metadata inválido, intento reparar…", raw);

            var fixed = raw;

            // Caso típico: `"year":,` → `"year":null,`
            fixed = fixed.replace(/:\s*,/g, ':null,');

            // Y si queda al final: `"year":}` → `"year":null}`
            fixed = fixed.replace(/:(\s*)}/g, ':null}');

            // Extra: asegurar comillas en las keys
            fixed = fixed.replace(/([{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":');

            try {
                meta = Ext.JSON.decode(fixed);
                console.warn("AC_UsuarioSearchModel: metadata reparado:", meta);
            } catch (e2) {
                console.error("AC_UsuarioSearchModel: no pude parsear metadata ni reparado", fixed, e2);
                meta = null;
            }
        }

        if (meta) {
            DomainManipulated = meta.domain || meta.patente || "";
        }

        return DomainManipulated || "";
    }
}

    ],

    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/ac_usuarios',
        appendId : false
    }
});
