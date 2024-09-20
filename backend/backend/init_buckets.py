from minio import Minio
from minio.error import S3Error
import urllib3
import os
from dotenv import load_dotenv

load_dotenv()


def init_buckets():
    # Disable SSL certificate warnings
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    # Initialize MinIO client without SSL certificate validation
    client = Minio(
        os.getenv("AWS_S3_ENDPOINT_URL").strip("https://"),
        access_key=os.getenv("AWS_ACCESS_KEY_ID"),
        secret_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        secure=True,  # Use HTTPS (SSL)
        http_client=urllib3.PoolManager(
            cert_reqs="CERT_NONE"
        ),  # Disable SSL validation
    )

    # Create buckets if they don't exist
    buckets = ["profile-pictures", "attachments", "project-icons"]
    for bucket in buckets:
        try:
            client.make_bucket(bucket)
        except S3Error as e:
            pass
