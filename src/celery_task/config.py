from celery import Celery

broker_url = 'amqp://bogdan:bogdan@localhost:5672/'
app = Celery("test_celery", broker=broker_url, backend="rpc://", include="src.celery_task.tasks")