from weasyprint import HTML

class GenerateMeetingMinute():    
    def generate(self, summary, meeting, meeting_entries, loans, fund_movements, buffer):
      
        stocks_table = ''
        fees_table = ''
        fine_table = ''
        loan_payment_table = ''
        for entrie in meeting_entries:
            if entrie['type'] == 'stocks':
                stocks_table += f'''
                <tr>
                    <td>{entrie['member__name']}</td>
                    <td>{entrie['value']}</td>
                </tr>
                '''
            elif entrie['type'] == 'fee':
                fees_table += f'''
                <tr>
                    <td>{entrie['member__name']}</td>
                    <td>{"R$ {:,.2f}".format(entrie['value'])}</td>
                </tr>
                '''
            elif entrie['type'] == 'fine':
                fine_table += f'''
                <tr>
                    <td>{entrie['member__name']}</td>
                    <td>{"R$ {:,.2f}".format(entrie['value'])}</td>
                </tr>
                '''
            elif entrie['type'] == 'loan-payment':
                loan_payment_table += f'''
                <tr>
                    <td>{entrie['member__name']}</td>
                    <td>{"R$ {:,.2f}".format(entrie['value'])}</td>
                </tr>
                '''
        loans_table = ''
        for loan in loans:
            loans_table += f'''
            <tr>
                <td>{loan["member__name"]}</td>
                <td>{"R$ {:,.2f}".format(loan["value"])}</td>
                <td>{"R$ {:,.2f}".format(loan["fee_by_month"])}</td>
            </tr>
            '''
        fund_movement_table = ''
        for fm in fund_movements:
            fund_movement_table += f'''
            <tr>
                <td>{"Resgate" if fm["type"] == "" else "Contribuição"}</td>
                <td>{fm["reason"] or ""}</td>
                <td>{"R$ {:,.2f}".format(fm["value"])}</td>
            </tr>
            '''
        
        html_content = f'''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
            let BRL = new Intl.NumberFormat('pt-BR', {{
                style: 'currency',
                currency: 'BRL',
            }});
            </script>
            <style>
                @page {{
                    size: A4; /* Change from the default size of A4 */
                    margin: 0mm; /* Set margin on each page */
                }}
                body {{
                    font-family: Arial, sans-serif;
                    margin: 30px;
                    background-color: whitesmoke;
                    font-size: 14px;
                }}
                h1 {{
                    text-align: center;
                    margin-bottom: 40px;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }}
                th, td {{
                    border: 1px solid rgba(0, 0, 0, 0.411);
                    padding: 8px;
                    text-align: center;
                    background-color: #eeeeee;
                }}
                th {{
                    background-color: #d4d4d4;
                }}

                ul {{
                    padding: 0;
                }}

                li {{
                    list-style: none;
                }}

                hr{{
                    margin: 40px 0;
                }}

                .card-container {{
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 40px;
                }}

                .card {{
                    border: 1px solid gray;
                    background-color: rgb(167, 167, 167);
                    border-radius: 5px;
                    padding: 30px;
                    position: relative;
                    width: 160px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }}

                .card-title {{
                    top: 5px;
                    left: 5px;
                    position: absolute;
                    font-size: 14px;
                }}

                .card-title.center{{
                    top: 10px;
                    left: auto;
                }}

                
                .card-content {{
                    font-size: 25px;
                }}
            </style>
        </head>
        <body>
            <h1>GOLD - REUNIÃO {meeting.date}</h1>
            <hr>
            <div class="card-container">
                <div class="card">
                    <div class="card-title">CAIXA</div>
                    <div class="card-content">{"R$ {:,.2f}".format(summary["cash"])}</div>
                </div>
                <div class="card">
                    <div class="card-title">FUNDO</div>
                    <div class="card-content">{"R$ {:,.2f}".format(summary["fund"])}</div>
                </div>
                <div class="card">
                    <div class="card-title">EMPRÉSTIMOS</div>
                    <div class="card-content">{"R$ {:,.2f}".format(summary["loaned"])}</div>
                </div>
            </div>
            <h2>ENTRADAS</h2>
            <ul>
                <li>AÇÕES: {"R$ {:,.2f}".format(summary['current_meeting_stocks'])}</li>
                <li>JUROS: {"R$ {:,.2f}".format(summary['current_meeting_fees'])}</li>
                <li>MULTAS: {"R$ {:,.2f}".format(summary['current_meeting_fines'])}</li>
                <li>FUNDO: R$ 125,00</li>
            </ul>
            <h2>SAÍDAS</h2>
            <ul>
                <li>EMPRÉSTIMOS: - {"R$ {:,.2f}".format(summary['current_meeting_loans_made'])}</li>
                {f'<li>FUNDO: - {"R$ {:,.2f}".format(125 - summary["current_meeting_fees"])}</li>' if summary['current_meeting_fund'] != 125 else ""}
            </ul>
            <h2>SALDO</h2>
            <ul>
                <li>CAIXA: {"R$ {:,.2f}".format(summary['current_meeting_inflow'])} - {"R$ {:,.2f}".format(summary['current_meeting_loans_made'])} = <b>{"R$ {:,.2f}".format(summary['current_meeting_new_cash_flow'])}</b></li>
                <li>FUNDO: R$125,00</li>
            </ul>
            <hr>
            <div class="card-container">
                <div class="card">
                    <div class="card-title center">QUANTIDADE DE AÇÕES</div>
                    <div class="card-content">{summary["stocks"]}</div>
                </div>
                <div class="card">
                    <div class="card-title center">VALOR ATUAL DA AÇÃO</div>
                    <div class="card-content">{"R$ {:,.2f}".format(summary["stock_value"])}</div>
                </div>
            </div>
            <hr>
            <h2>AÇÕES</h2>
            <table>
                <tr>
                    <th>MEMBRO</th>
                    <th>QUANTIDADE</th>
                </tr>
                {stocks_table}
            </table>
            
            <h2>EMPRÉSTIMOS TOMADOS</h2>
            <table>
                <tr>
                    <th>MEMBRO</th>
                    <th>VALOR</th>
                    <th>JUROS MENSAL</th>
                </tr>
                {loans_table}
            </table>
            
            <h2>PAGAMENTO DE EMPRÉSTIMOS</h2>
            <table>
                <tr>
                    <th>MEMBRO</th>
                    <th>VALOR</th>
                </tr>
                {loan_payment_table}
            </table>

            <h2>JUROS</h2>
            <table>
                <tr>
                    <th>MEMBRO</th>
                    <th>VALOR</th>
                </tr>
                {fees_table}
            </table>

            <h2>MULTAS</h2>
            <table>
                <tr>
                    <th>MEMBRO</th>
                    <th>VALOR</th>
                </tr>
                {fine_table}
            </table>

            <h2>MOVIMENTAÇÕES FUNDO</h2>
            <table>
                <tr>
                    <th>TIPO</th>
                    <th>MOTIVO</th>
                    <th>VALOR</th>
                </tr>
                {fund_movement_table}
            </table>
        </body>
        </html>
        '''

        HTML(string=html_content).write_pdf(buffer)