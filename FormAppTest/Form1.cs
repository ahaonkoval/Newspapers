using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FormAppTest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            CryptA.Cryptor c1 = new CryptA.Cryptor();
            string s1 = c1.Crypt("aaa");

            CryptA.Cryptor c2 = new CryptA.Cryptor();
            string s2 = c2.Crypt("aaa");

            if (s1 == s2)
            {
                MessageBox.Show(s1 + " " + s2);
            }
        }
    }
}
