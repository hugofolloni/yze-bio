using System.Security.Cryptography;
using System.Text;

namespace Server.Utils
{
    public static class Utils
    {
        /// <summary>
        /// Generates an MD5 hash based on the concatenation of login and password.
        /// </summary>
        /// <param name="login">The user login.</param>
        /// <param name="password">The user password.</param>
        /// <returns>A string representing the MD5 hash of the concatenated login and password.</returns>
        public static string CreateKey(string login, string password)
        {
            // Concatenate login and password
            string input = login + password;

            // Convert the input string to bytes
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);

                // Compute the hash
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the hash bytes to a hexadecimal string
                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("x2"));
                }

                return sb.ToString();
            }
        }
    }
}