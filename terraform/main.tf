terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    bucket         = "netflix-k8s-tfstate-98234"
    key            = "netflix-clone/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "netflix-k8s-tf-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

module "s3_storage" {
  source      = "./modules/s3"
  bucket_name = "${var.project_name}-media-${var.environment}-${var.unique_id}"
  environment = var.environment
}

module "cdn" {
  source                = "./modules/cloudfront"
  s3_bucket_id          = module.s3_storage.bucket_id
  s3_bucket_arn         = module.s3_storage.bucket_arn
  s3_bucket_domain_name = module.s3_storage.bucket_regional_domain_name
}

module "compute" {
  source        = "./modules/compute"
  instance_type = var.instance_type
  project_name  = var.project_name
}