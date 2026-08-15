using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Slbf.Services.Rest
{
    public partial class ShowException : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Global.CurrentExceptionDate != null) TxtDate.Text = Global.CurrentExceptionDate.ToString();
            if (Global.CurrentException != null) Txt.Text = Global.CurrentException.ToString();
        }
    }
}