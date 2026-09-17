output "public_ip" {
  description = "Public IP of the EC2 K3s instance"
  value       = aws_instance.k8s_node.public_ip
}

output "private_key_pem" {
  description = "Private key generated for EC2 SSH access"
  value       = tls_private_key.ssh_key.private_key_pem
  sensitive   = true
}