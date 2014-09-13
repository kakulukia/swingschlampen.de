from fabric.api import run, env
from fabric.context_managers import cd

env.hosts = ['pepperz.de']


def deploy():
    with cd('www/swingschlampen.de'):
        run('git pull')
        run('forever restart /home/andy/www/swingschlampen.de/server.js')
