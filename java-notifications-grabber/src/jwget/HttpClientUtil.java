package jwget;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
 
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.parser.*;
import org.jsoup.select.Elements;
 
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.*;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
 
public class HttpClientUtil {
 
private DefaultHttpClient client;
private HttpContext localContext;
private CookieStore cookiestore;
//Constructor
public HttpClientUtil()
{
    client = new DefaultHttpClient();
    localContext = new BasicHttpContext();
    cookiestore = new BasicCookieStore();
    client.getParams().setParameter("http.useragent","Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0");
    client.getParams().setParameter("http.protocol.handle-redirects", true);
    client.getParams().setParameter("http.protocol.max-redirects", 1);
}
 
//Make a get request to a page
public String getPage(String url)
{
    HttpGet request;
    HttpResponse response;
    try
    {
        request = new HttpGet(url);
        System.out.println("Fetching " + url);
        response = client.execute(request,localContext);
        return EntityUtils.toString(response.getEntity());
    }
    catch(Exception e)
    {
        e.printStackTrace();
        return "";
    }
}
 
public String loginToAE(String html,String username,String password)
{
    HttpPost httpost = new HttpPost("http://pegasus.astroempires.com/login.aspx");
    HttpResponse response;
    HttpEntity entity;
    String content = "";
    try
    {
        List nvps = getFormElements(html, username, password);
        httpost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
        response = client.execute(httpost,localContext);
    entity = response.getEntity();
 
    List cookies = client.getCookieStore().getCookies();
  cookies = client.getCookieStore().getCookies();
    if (cookies.isEmpty()) {
        System.out.println("None");
    } else {
        for (int i = 0; i < cookies.size(); i++) {
            System.out.println("- " + cookies.get(i).toString());
        }
    }
    return EntityUtils.toString(response.getEntity());
 
    }
    catch(Exception e)
    {
        e.printStackTrace();
        return "";
    }
}
 
public List getFormElements(String html,String username, String password)
{
    org.jsoup.nodes.Document doc = Jsoup.parse(html);
    Element loginform = doc.getElementById("login");
    if (loginform == null)
    	System.out.println("loginform null");
    Elements inputElements = loginform.getElementsByTag("input");
    List  nvps = new ArrayList ();
    for(Element inputElement : inputElements)
    {
        String key = inputElement.attr("name");
        String value = inputElement.attr("value");
        switch (key) {
        case "email":
        	value = username;
        	break;
        case "pass":
        	value = password;
        	break;
        case "navigator":
        	value = "Netscape";
        	break;
        case "hostname":
        	value = "pegasus.astroempires.com";
        	break;
        case "javascript":
        	value = "false";
        	break;
        }
        
        nvps.add(new BasicNameValuePair(key,value));
    }
    System.out.println(nvps.toString());
    return nvps;
}
 
//Dispose the client
public void close()
{
    client.getConnectionManager().shutdown();
}
}