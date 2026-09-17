output "ec2_public_ip" {
  value = aws_instance.k8s_node.public_ip
}

output "ssh_key_pem" {
  value     = tls_private_key.ssh_key.private_key_pem
  sensitive = true
}