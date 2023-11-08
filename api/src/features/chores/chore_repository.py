from datetime import datetime
from src.models.child_chore import ChildChore
from src.models.chore import Chore
from src.services.helper import run_sql


def get_all_chores():
  sql = """
    SELECT *
    FROM chore
  """
  return run_sql(sql, {}, output_class=Chore)

def get_chores_scheduled_for_day_of_week(day_of_week: int, child_id: int):
  sql = """
    SELECT c.*
    FROM chore c
    INNER JOIN child_assignment a
      ON (a.chore_id = c.id)
    WHERE %(day)s = ANY(days_of_week)
    AND a.child_id = %(child_id)s
  """
  params = {"day": day_of_week, "child_id": child_id}
  return run_sql(sql, params, output_class=Chore)

def get_chore_scheduled_for_day(date: datetime, child_id: int, chore_id: int):
  sql = """
    SELECT *
    FROM child_chore
    WHERE child_id = %(child_id)s
    AND chore_id = %(chore_id)s
    AND date = %(date)s
  """
  params = {
    "child_id": child_id,
    "chore_id": chore_id,
    "date": date
  }
  results = run_sql(sql, params, output_class=ChildChore)
  if results:
    return results[0]

def create_child_chore(child_id: int, chore_id: int, date: datetime):
  sql = """
    INSERT INTO child_chore (child_id, chore_id, date)
    VALUES (%(child_id)s, %(chore_id)s, %(date)s)
    RETURNING *
  """
  params = {
    "child_id": child_id,
    "chore_id": chore_id,
    "date": date
  }
  return run_sql(sql, params, output_class=ChildChore)[0]
