variable "bucket_name" {
  type        = string
  description = "Unique name for the S3 video storage bucket"
}

variable "environment" {
  type    = string
  default = "dev"
}