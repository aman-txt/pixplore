from google.cloud import language_v1


def hello_world(request):

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)


     if request.method == 'POST':
    request_json = request.get_json()
    print(request_json)

    client = language_v1.LanguageServiceClient()
    type_ = language_v1.Document.Type.PLAIN_TEXT
    language = "en"
    encoding_type = language_v1.EncodingType.UTF8
    document = {"content": str(request_json['feedback']), "type_": type_, "language": language}
    response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
    print(u"Document sentiment score: {}".format(response.document_sentiment.score))
    print(
        u"Document sentiment magnitude: {}".format(
            response.document_sentiment.magnitude
        )
    )

    headers = {
        'Access-Control-Allow-Origin': '*'
    } 
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return (str(response.document_sentiment.score),200,headers)
