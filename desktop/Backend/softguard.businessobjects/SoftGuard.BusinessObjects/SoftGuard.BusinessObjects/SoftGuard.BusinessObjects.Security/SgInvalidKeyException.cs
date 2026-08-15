using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SoftGuard.BusinessObjects.Security
{
    [Serializable()]
    public class SgInvalidKeyException : System.Exception
    {
        public SgInvalidKeyException() : base() { }
        public SgInvalidKeyException(string message) : base(message) { }
        public SgInvalidKeyException(string message, System.Exception inner) : base(message, inner) { }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client.
        protected SgInvalidKeyException(System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
