output "ec2_public_ip" {
  description = "Target EC2 Public IP"
  value       = module.compute.ec2_public_ip
}

output "video_s3_bucket" {
  description = "S3 Bucket Name"
  value       = module.s3_storage.bucket_id
}

output "cloudfront_streaming_url" {
  description = "CloudFront CDN Base URL"
  value       = "https://${module.cdn.cloudfront_domain_name}"
}