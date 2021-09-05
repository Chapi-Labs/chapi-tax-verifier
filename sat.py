from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time 
import base64
from captcha_solver import CaptchaSolver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def sendKeys(elem, string):
    for letter in string:
        time.sleep(0.5)
        elem.send_keys(letter)

driver = webdriver.Chrome()
driver.get("https://portal.sat.gob.gt/portal/verificador-integrado/")
wait = WebDriverWait(driver, 30)
iframe = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'iframe')))
driver.switch_to.frame(iframe)
element_image = wait.until(EC.visibility_of_element_located((By.ID, 'formContent:j_idt28')))

# get the captcha as a base64 string
img_base64 = driver.execute_script("""
    var ele = arguments[0];
    var cnv = document.createElement('canvas');
    cnv.width = ele.width; cnv.height = ele.height;
    cnv.getContext('2d').drawImage(ele, 0, 0);
    return cnv.toDataURL('image/jpeg').substring(22);    
    """, element_image)
with open(r"captcha.jpg", 'wb') as f:
    f.write(base64.b64decode(img_base64))



solver = CaptchaSolver('2captcha', api_key='c8d9f067bb8cf538a7ed49880280746f')
raw_data = open('captcha.jpg', 'rb').read()
print ("solving captcha")
captcha_solution = solver.solve_captcha(raw_data)
print (captcha_solution)
input_element = driver.find_element_by_id("formContent:j_idt30")
sendKeys(input_element, captcha_solution)
input_element.send_keys(Keys.ENTER)
messages = wait.until(EC.visibility_of_element_located((By.ID, 'formContent:msg')))


while (len(messages.find_elements_by_xpath(".//*")) > 0):
    element_image = wait.until(EC.visibility_of_element_located((By.ID, 'formContent:j_idt28')))
    # get the captcha as a base64 string
    img_base64 = driver.execute_script("""
        var ele = arguments[0];
        var cnv = document.createElement('canvas');
        cnv.width = ele.width; cnv.height = ele.height;
        cnv.getContext('2d').drawImage(ele, 0, 0);
        return cnv.toDataURL('image/jpeg').substring(22);    
        """, element_image)
    with open(r"captcha.jpg", 'wb') as f:
        f.write(base64.b64decode(img_base64))
    solver = CaptchaSolver('2captcha', api_key='c8d9f067bb8cf538a7ed49880280746f')
    raw_data = open('captcha.jpg', 'rb').read()
    print ("solving captcha")
    captcha_solution = solver.solve_captcha(raw_data)
    print (captcha_solution)
    input_element = driver.find_element_by_id("formContent:j_idt30")
    sendKeys(input_element, captcha_solution)
    input_element.send_keys(Keys.ENTER)
    messages = wait.until(EC.visibility_of_element_located((By.ID, 'formContent:msg')))

wait.until(EC.visibility_of_element_located((By.ID, 'formContent:selTipoConsulta_label'))).click()
wait.until(EC.visibility_of_element_located((By.ID, 'formContent:selTipoConsulta_2'))).click()
wait.until(EC.visibility_of_element_located((By.ID, 'formContent:pNitEmi'))).send_keys("69141142")
time.sleep(0.2)
driver.find_element_by_xpath('//span[text()="Buscar"]').click()
iframe = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'iframe')))
driver.switch_to.frame(iframe)
result = driver.find_element_by_id("formContent:j_idt19")
if "NO" in result.text:
    pass
else:
    table = driver.find_element_by_id("formContent:pnlGridIncum")
    for row in table.find_elements_by_xpath(".//tr"):
        # get the text from all the td's from each row
        try:
            print (row.get_attribute('innerHTML'))
            description = row.find_element_by_css_selector("a")
            print (description, description.text)
        except:
            pass

