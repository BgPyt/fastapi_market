from starlette.templating import Jinja2Templates

templates = Jinja2Templates(directory='src/templates')

def currency(value):
    return "{:,}".format(value)

templates.env.filters['currency'] = currency