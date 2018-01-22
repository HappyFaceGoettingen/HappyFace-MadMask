# Copyright 2014 II. Physikalisches Institut - Georg-August-Universitaet Goettingen
# Author: Christian Gen Kawamura (gen.kawamura@cern.ch)
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

import hf
from sqlalchemy import *
from lxml import etree
import re
from datetime import datetime
from datetime import timedelta

class MadAnalyzerInfoPathway(hf.module.ModuleBase):
    config_keys = {
        'job_mode': ('Job Submission Mode', 'CREAM'),
        'job_endpoint': ('Job Submission Endpoint', 'https://creamce3.goegrid.gwdg.de:8443/ce-cream/services'),
    }

    #config_hint = ''

    table_columns = [
        Column('job_mode', TEXT),
        Column('job_endpoint', TEXT),
    ], []

    subtable_columns = {
        'details_table': ([
        Column('job_id', TEXT),
        Column('job_status', TEXT),
        Column('information', TEXT),
        Column('last_check', DATETIME),
        Column('error_info', TEXT)
    ], [])}

    def prepareAcquisition(self):
        # Set job submission interface
        self.job_mode = "job mode"
        self.job_endpoint = "job end point"
                
        self.details_table_db_value_list = []

    def extractData(self):
        data = {
            'job_mode': "job mode",
            'job_endpoint': "job end point",
            'status': 1
            }
     

        ## Submit Ganga Jobs
        ##print "Ga Ga Gan Ganga Jobbbbbbuuuu....."


        ## Get Ganga Status
        detail = {}
        detail['job_id'] = "1"
        detail['job_status'] = "Running"
        detail['information'] = "Information dayo"
        detail['last_check'] = datetime.now()
        detail['error_info'] = "Defenitely No Error!!"

        ## set database data
        index_row = 0
        self.details_table_db_value_list.append({})
        self.details_table_db_value_list[index_row] = detail

        
        #print self.details_table_db_value_list
        for detail in self.details_table_db_value_list:
            if detail['job_status'].lower() == 'Oh No!':
                data['status'] = min(data['status'],0)
            elif detail['job_status'].lower() == 'Bad!':
                data['status'] = min(data['status'],0.5)
            elif detail['job_status'].lower() == 'running':
                data['status'] = min(data['status'],1)
            else:
                data['status'] = min(data['status'],0)

        return data


    def fillSubtables(self, parent_id):
        self.subtables['details_table'].insert().execute([dict(parent_id=parent_id, **row) for row in self.details_table_db_value_list])
   
    def getTemplateData(self):
        data = hf.module.ModuleBase.getTemplateData(self)
        details = self.subtables['details_table'].select().where(self.subtables['details_table'].c.parent_id==self.dataset['id']).execute().fetchall()
        data['details_job'] = map(dict, details)

        return data

