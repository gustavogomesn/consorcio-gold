from weasyprint import HTML
import os

class GenerateMeetingMinute():    
    def generate(self, meeting, meeting_entries, loans, buffer):
        print(os.getcwd())
        with open("./website/assets/templateMinute.html", "r", encoding="utf-8") as file:
            html_content = file.read()
            HTML(string=html_content).write_pdf(buffer)
        