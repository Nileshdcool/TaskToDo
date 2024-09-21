namespace API.Middlewares
{
    public class ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        private readonly RequestDelegate _next = next;
        private readonly string? _apiKeyHeaderName = configuration["ApiKeySettings:HeaderName"];
        private readonly string? _apiKey = configuration["ApiKeySettings:Key"];

        public async Task InvokeAsync(HttpContext context)
        {
            if (_apiKeyHeaderName == null || !context.Request.Headers.TryGetValue(_apiKeyHeaderName, out var extractedApiKey))
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("API Key not provided.");
                return;
            }

            if (!(_apiKey?.Equals(extractedApiKey) ?? false))
            {
                context.Response.StatusCode = 403; // Forbidden
                await context.Response.WriteAsync("Unauthorized client.");
                return;
            }

            await _next(context);
        }
    }
}