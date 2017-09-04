using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using LinqToDB;

namespace PapersDbWorker
{
    public class WDB: IDisposable
    {
        bool disposed = false;
        SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);

        public User User { get; set; }

        public Dict Dict { get; set; }

        public Cells Cells { get; set; }

        public Good Good { get; set; }

        public Logs DbLoger { get; set; }

        public Paper Paper { get; set; }
        public WDB()
        {
            this.User = new PapersDbWorker.User();
            this.Dict = new PapersDbWorker.Dict();
            this.Cells = new PapersDbWorker.Cells();
            this.Good = new PapersDbWorker.Good();
            this.DbLoger = new Logs();
            this.Paper = new PapersDbWorker.Paper();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            //
            disposed = true;
        }
    }
}
