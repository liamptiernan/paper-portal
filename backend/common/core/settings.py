import ast

from pydantic_settings import BaseSettings

from backend.common.core.config import config, env_type, load_dotenv

load_dotenv(env_type)


class Settings(BaseSettings):
    db_login: dict[str, str]
    try:
        db_login = ast.literal_eval(config["DB_LOGIN"])
    except Exception:
        db_login = {
            "username": config["DB_USERNAME"],
            "password": config["DB_PASSWORD"],
        }
    db_username: str = db_login["username"]
    db_password: str = db_login["password"]
    db_url: str = f"postgresql+psycopg://{db_username}:{db_password}@{config['DB_ADDRESS']}:{config['DB_PORT']}/{config['DB_NAME']}"  # noqa: E501
    is_local: bool = env_type == "local"
    auth0_audience: str
    auth0_domain: str
    client_origin_url: str
    auth0_attr_key: str


settings = Settings()
