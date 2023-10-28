from pydantic_settings import BaseSettings

from backend.common.core.config import config, env_type, load_dotenv

load_dotenv(env_type)


class Settings(BaseSettings):
    db_url: str = config["DB_URL"]


settings = Settings()
