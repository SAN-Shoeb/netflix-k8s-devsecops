variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "netflix-k8s"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "unique_id" {
  type        = string
  description = "Random suffix to keep S3 bucket globally unique"
  default     = "98234"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}