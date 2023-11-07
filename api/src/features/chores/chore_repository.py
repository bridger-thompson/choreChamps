from src.models.chore import Chore
from src.services.helper import run_sql


def get_all_chores():
  sql = """
    SELECT *
    FROM chore
  """
  return run_sql(sql, {}, output_class=Chore)

# get chores for day (will dynamically create chore for child)