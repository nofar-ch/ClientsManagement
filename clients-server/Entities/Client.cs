﻿namespace NessOrtClients.Entities
{
    public class Client : BaseEntity
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string IpAddress { get; set; }

    }
}