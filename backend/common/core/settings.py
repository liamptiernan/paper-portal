from pydantic_settings import BaseSettings

from backend.common.core.config import config, env_type, load_dotenv

load_dotenv(env_type)


class Settings(BaseSettings):
    db_url: str = config["DB_URL"]
    is_local: bool = env_type == "local"
    auth0_audience: str
    auth0_domain: str
    client_origin_url: str
    auth0_email_key: str


settings = Settings()
