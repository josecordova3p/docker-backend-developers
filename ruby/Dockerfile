FROM ruby:3.1.2-bullseye
WORKDIR /app
COPY . .
RUN gem install sinatra thin
CMD ["ruby", "server.rb"]